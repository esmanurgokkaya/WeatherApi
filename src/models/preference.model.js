import prisma from '../config/db.js';

const Preference = prisma.preference;

class preferenceModel {

async findByUserId(userId) {
  return Preference.findUnique({
    where: { userId }
  });
}

async upsert(userId, data) {
  return Preference.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data }
  });
}
}
export default new preferenceModel ();