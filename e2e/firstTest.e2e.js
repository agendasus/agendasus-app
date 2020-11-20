describe('Example', () => {
  afterEach(async () => {
    await device.reloadReactNative();
  });

  it('Deve realizar a tentativa de login sem sucesso', async () => {
    await expect(element(by.id('field_user'))).toBeVisible();
    await element(by.id('field_user')).typeText('john@example.com');
    await expect(element(by.id('field_user_password'))).toBeVisible();
    await element(by.id('field_user_password')).typeText('123456');
  });


  it('Deve realizar a tentativa de login bem sucedida', async () => {
    await expect(element(by.id('field_user'))).toBeVisible();
    await element(by.id('field_user')).typeText('rmovieira@gmail.com');
    await expect(element(by.id('field_user_password'))).toBeVisible();
    await element(by.id('field_user_password')).typeText('123456');
  });

});
