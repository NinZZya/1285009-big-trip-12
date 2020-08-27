export const createResetButtonTemplate = (isAddMode) => {
  return (
    `<button class="event__reset-btn" type="reset">
      ${isAddMode ? `Cancel` : `Delete`}
    </button>`
  );
};
