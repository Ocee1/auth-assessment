import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signup.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash, } from 'bcrypt';
import { SignInInput } from './dto/signin-input';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ){}
  async signup(signUpInput: SignUpInput) {
    const hashedPassword = await hash(signUpInput.password, 10);
    const user = await this.prisma.user.create({ 
      data: {
        username: signUpInput.username,
        hashedPassword,
        email: signUpInput.email
      } 
    });
    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email
    );
    await this.updateRefreshToken(
      user.id,
      refreshToken
    );
    return {accessToken, refreshToken, user};
  }

  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInInput.email }
    })

    if (!user) {
      throw new ForbiddenException('Access Denied!');
    }

    const passwordMatch = await compare(signInInput.password, user.hashedPassword);

    if (!passwordMatch) {
      throw new ForbiddenException('Access Denied!');
    }
    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return {accessToken, refreshToken, user};
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async createToken(userId: number, email: string) {
    const accessToken =this.jwtService.sign({
      userId,
      email
    }, { expiresIn: '20s', secret: this.configService.get('ACCESS_TOKEN_SECRET') });
    
    const refreshToken = this.jwtService.sign({
      userId,
      email,
      accessToken,
    }, {expiresIn: '3d', secret: this.configService.get('REFRESH_TOKEN_SECRET')});
    return {accessToken, refreshToken}
  }

  async updateRefreshToken (userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.prisma.user.update({ 
      where: { id: userId },
      data: { hashedRefreshToken }
    });
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: { not: null },
      },
      data: { hashedRefreshToken: null }
    });
    return { loggedOut: true };
  }
}
