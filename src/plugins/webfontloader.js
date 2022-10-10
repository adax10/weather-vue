export async function loadFonts() {
  const webFontLoader = await import('webfontloader');

  webFontLoader.load({
    google: {
      families: ['Montserrat:100,300,400,500,700,900&display=swap']
    }
  });
}
