const getCaption = (isAddMode, isDeleting) => {
  if (isAddMode) {
    return `Cancel`;
  }

  return `${isDeleting ? `Deleting...` : `Delete`}`;
};

export const createResetButtonTemplate = (isAddMode, isDeleting) => {
  return (
    `<button class="event__reset-btn" type="reset">
      ${getCaption(isAddMode, isDeleting)}
    </button>`
  );
};
