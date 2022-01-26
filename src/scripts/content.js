// module for creating the content section

const createContent = () => {
  // create content container
  const content = document.createElement('div');
  content.id = 'content';
  // create the messages heading area
  const messages = document.createElement('div');
  messages.id = 'messages';
  // create the grid container for the game boards
  const gridContainer = document.createElement('div');
  gridContainer.id = 'gridContainer';
  // create the buttons container
  const buttons = document.createElement('div');
  buttons.id = 'buttons';

  // append all items into the content container
  content.append(messages);
  content.append(gridContainer);
  content.append(buttons);

  return content;
};

export default createContent;
