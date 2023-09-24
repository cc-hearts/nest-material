import { Test, TestingModule } from '@nestjs/testing';
import { RolePrivilegeController } from './role-privilege.controller';
import { RolePrivilegeService } from './role-privilege.service';

describe('RolePrivilegeController', () => {
  let controller: RolePrivilegeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolePrivilegeController],
      providers: [RolePrivilegeService],
    }).compile();

    controller = module.get<RolePrivilegeController>(RolePrivilegeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
