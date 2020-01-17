


export async function queryTypeFaultByCompanyId(params) {
    return request(`/rs/equipmentRepairHis/queryTypeFaultByCompanyId`, {
        method: 'POST',
        body: params,
    });
}