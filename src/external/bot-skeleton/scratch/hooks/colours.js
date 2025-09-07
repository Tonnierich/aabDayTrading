import Blockly from "blockly"

const lightMode = () => {
  const workspace = Blockly
  workspace.Colours.RootBlock = {
    colour: "#4635B0",
    colourSecondary: "#5645B6",
    colourTertiary: "#A189F6",
  }

  workspace.Colours.Base = {
    colour: "#E4E5E5",
    colourSecondary: "#ffffff",
    colourTertiary: "#A189F6",
  }

  workspace.Colours.Special1 = {
    colour: "#5645B6",
    colourSecondary: "#4635B0",
    colourTertiary: "#A189F6",
  }

  workspace.Colours.Special2 = {
    colour: "#4635B0",
    colourSecondary: "#5645B6",
    colourTertiary: "#A189F6",
  }

  workspace.Colours.Special3 = {
    colour: "#A189F6",
    colourSecondary: "#E4E5E5",
    colourTertiary: "#5645B6",
  }

  workspace.Colours.Special4 = {
    colour: "#161415",
    colourSecondary: "#F1F4F5",
    colourTertiary: "#4635B0",
  }
}

export const setColors = () => lightMode()
