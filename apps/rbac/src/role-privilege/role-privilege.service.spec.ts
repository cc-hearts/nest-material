import { Test, TestingModule } from '@nestjs/testing';
import { RolePrivilegeService } from './role-privilege.service';

describe('RolePrivilegeService', () => {
  let service: RolePrivilegeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolePrivilegeService],
    }).compile();

    service = module.get<RolePrivilegeService>(RolePrivilegeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
