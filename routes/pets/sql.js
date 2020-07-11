module.exports = {
    GET_PETS_DETAILS: `SELECT id_pet idPet,
    name,
    age,
    colours,
    created_by createdBy,
    created_date createdDate 
    FROM pets WHERE id_pet = ?`,

    SAVE_PET_DETAILS: `INSERT INTO pets SET name = ?, age = ?, colours = ?, created_by = ?, created_date = ?`,

    DELETE_PET_DETAILS: `DELETE FROM pets WHERE id_pet = ?`
}