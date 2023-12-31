import { AdminStrategy } from './admin.strategy';
import { GuestStrategy } from './guest.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { LocalStrategy } from './local.strategy';
import { NaverStrategy } from './naver.strategy';

export const strategies = [
  LocalStrategy,
  KakaoStrategy,
  NaverStrategy,
  JwtStrategy,
  JwtRefreshStrategy,
  AdminStrategy,
  GuestStrategy,
];
