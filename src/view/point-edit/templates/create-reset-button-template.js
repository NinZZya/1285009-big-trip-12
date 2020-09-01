const getCaption = (isAddMode, isDeleting) => {
  if (isAddMode) {
    return `Cancel`;
  }

  return `${isDeleting ? `Deleting...` : `Delete`}`;
};

export const createResetButtonTemplate = (isAddMode, isDeleting, isDisabled) => {
  return (
    `<button
      class="event__reset-btn"
      type="reset"
      ${isDisabled ? `disabled` : ``}
    >
      ${getCaption(isAddMode, isDeleting)}
    </button>`
  );
};
