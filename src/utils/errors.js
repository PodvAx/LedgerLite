const NOT_FOUND_CODE = 'NTFND';
const NOTHING_TO_UPDATE_CODE = 'NTUPD';
const WRONG_ID_CODE = 'WRID';
const VALIDATION_ERROR_CODE = 'VLDTN';

const errors = {
  notFound(message) {
    const error = new Error(message);

    error.code = NOT_FOUND_CODE;

    return error;
  },

  nothingToUpdate(message) {
    const error = new Error(message);

    error.code = NOTHING_TO_UPDATE_CODE;

    return error;
  },

  wrongId(message) {
    const error = new Error(message);

    error.code = WRONG_ID_CODE;

    return error;
  },

  validation(message) {
    const error = new Error(message);

    error.code = VALIDATION_ERROR_CODE;

    return error;
  },
};

module.exports = {
  errors,
  NOT_FOUND_CODE,
  NOTHING_TO_UPDATE_CODE,
  VALIDATION_ERROR_CODE,
  WRONG_ID_CODE,
};
