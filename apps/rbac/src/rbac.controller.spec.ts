import { Test, TestingModule } from '@nestjs/testing';
import { RbacController } from './rbac.controller';
import { RbacService } from './rbac.service';

describe('RbacController', () => {
  let rbacController: RbacController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RbacController],
      providers: [RbacService],
    }).compile();

    rbacController = app.get<RbacController>(RbacController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rbacController.getHello()).toBe('Hello World!');
    });
  });
});
