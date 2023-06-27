import MathlerClient from "./MathlerClient";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        text: () => Promise.resolve('1+22+3\n2-1+10')
    })
});


test('It can create a new MathlerClient instance', () => {
    const client = new MathlerClient('someapiurl');
    expect(client).not.toBeNull();
});

test('fetchLatestGameData calls fetch with the right url', () => {
    const apiUrl = 'someapiurl';
    fetch.mockReturnValue(Promise.resolve(new Response('1+22+3')));
    const client = new MathlerClient(apiUrl);
    client.fetchLatestGameData();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(apiUrl);
});
