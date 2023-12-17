/**
 * @return {Object} default pagination
 */
export function getDefaultPagination() {
  return {
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 40, 50],
  }
}

export default {
  getDefaultPagination,
}
