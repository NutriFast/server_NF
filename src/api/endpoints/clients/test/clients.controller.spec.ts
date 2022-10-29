import { ClientsController } from "../clients.controller";
import { ClientsService } from "../clients.service";
import { faker } from '@faker-js/faker';
import { ClientDocument } from "../../../infrastructure/documents/clientDocument";
describe('Clients Controller', () => {
  let controller: ClientsController;
  let service: ClientsService;


  describe('findAll', () => {
    it('should return an array of cats', async () => {
      jest.spyOn(service, 'create').mockImplementation((dto,userId) => {
        const document = new ClientDocument();
        document.build(null, userId, dto.name, dto.birthDate, dto.gender);
        return new Promise((resolve,reject) => resolve(document));
      });
      const req = {
        user: {
          userId:"123"
        },
      }
      const dto = {
        name: faker.name.fullName(),
        birthDate: faker.date.birthdate(),
        gender: 'Masculino'
      }
      expect(controller.create(req,dto)).resolves.toBe(dto);
    });
  });
});
