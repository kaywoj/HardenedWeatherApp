const { isValidCity, getWeather } = require('./Api');

// Mock the fetch function to control the API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ main: { temp: 20 }, cod: "200" }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('isValidCity returns true for valid city', () => {
  expect(isValidCity('New York')).toBe(true);
});

test('isValidCity returns false for invalid city', () => {
  expect(isValidCity('12345')).toBe(false);
});

test('getWeather returns weather data for valid city', async () => {
  const data = await getWeather('New York');
  expect(data.main.temp).toBe(20);
});

test('getWeather throws error for invalid city', async () => {
  fetch.mockImplementationOnce(() => Promise.reject('API is down'));
  await expect(getWeather('InvalidCity')).rejects.toThrow('API is down');
});