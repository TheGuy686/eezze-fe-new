/**
 * Default data modal for collection (Same as API Platform modal)
 *
 * @return {Object} Modal listing for vuex store
 */
export function collection() {
  return {
    'hydra:member': [],
    'hydra:totalItems': 0,
    'hydra:view': {},
    'hydra:search': {},
  }
}

/**
 * Default data modal for item (Same as API Platform modal)
 *
 * @return {Object} Modal item for vuex store
 */
export function item() {
  return {}
}

export default {
  collection,
  item,
}
