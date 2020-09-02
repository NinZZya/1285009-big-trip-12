const ButtonName = {
  CANCEL: `Cancel`,
  DELETING: `Deleting...`,
  DELETE: `Delete`,
};

const getResetCaption = (isDeleting) => `${
  isDeleting ? ButtonName.DELETING : ButtonName.DELETE
}`;

export const createResetButtonTemplate = (isAddMode, isDeleting, isDisabled) => {
  return (
    `<button
      class="event__reset-btn"
      type="reset"
      ${isDisabled ? `disabled` : ``}
    >
      ${isAddMode ? ButtonName.CANCEL : getResetCaption(isDeleting)}
    </button>`
  );
};
