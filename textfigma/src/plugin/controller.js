// figma.showUI (__html__);

// figma.ui.onmessage = async msg => {
//   if (msg.type === 'changetext') {
//     const newtext = msg.inputtext;
//     const node = figma.currentPage.selection[0];
//     const oldtext = node.characters;
//     node.characters = node.characters.replace (oldtext, newtext);
//     console.log ('msg.text', msg.inputtext);
//     console.log ('oldtext', oldtext);
//   }

//   figma.closePlugin ();
// };
figma.showUI (__html__, {width: 240, height: 200});

async function changeText (inputtext) {
  await figma.loadFontAsync ({family: 'Inter', style: 'Regular'});
  const selection = figma.currentPage.selection;
  if (selection.length > 0 && selection[0].type === 'TEXT') {
    const node = selection[0];
    const oldText = node.characters;
    const newText = inputtext.slice (
      0,
      Math.min (inputtext.length, node.characters.length)
    );
    node.characters = newText;
    console.log ('Old text:', oldText);
    console.log ('New text:', newText);
  } else {
    console.log ('Please select a text layer.');
  }
  figma.closePlugin ();
}

figma.ui.onmessage = async ({type, inputtext}) => {
  if (type === 'changetext') {
    changeText (inputtext);
  }
};
