import { Repository } from 'typeorm';

export async function getEntityOrNullById<
  T extends string | number,
  R extends Repository<any>,
>(id: T, repository: R) {
  const entity = await repository.findOne({
    where: { id },
  });
  return entity || null;
}
