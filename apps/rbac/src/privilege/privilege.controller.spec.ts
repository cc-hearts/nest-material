import { Test, TestingModule } from '@nestjs/testing';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeService } from './privilege.service';

describe('PrivilegeController', () => {
  let controller: PrivilegeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivilegeController],
      providers: [PrivilegeService],
    }).compile();

    controller = module.get<PrivilegeController>(PrivilegeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
