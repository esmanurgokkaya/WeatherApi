import prisma from '../prisma/client.js';

const Location = prisma.location;

class LocationModel {

    async createLocation(data) {
        return await Location.create( { data } );
    }

    async getLocationById(id) {
        return await Location.findUnique( { where: { id } } );
    }

    async getAllLocationsByUserId(user_id){
        return await Location.findMany( { where: { user_id } } );
    }

    async updateLocation(id, data) {
        return await Location.update( { where: { id }, data  } );
    }

    async deleteLocation(id) {
        return  await Location.delete( { where: { id } } );
    }

}

export default new LocationModel();