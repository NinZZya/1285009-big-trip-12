export const createSaveButtonTemplate = (isDisabled) => {
  return (
    `<button
      class="event__save-btn  btn  btn--blue"
      type="submit"
      ${isDisabled ? `disabled` : ``}
    >
      Save
    </button>`
  );
};
