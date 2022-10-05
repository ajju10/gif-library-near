import {Worker, NearAccount} from 'near-workspaces';
import anyTest, {TestFn} from 'ava';

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = {root, contract};
});

test.afterEach(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('returns the gif list', async (t) => {
  const {contract} = t.context.accounts;
  const gifs: [] = await contract.view('get_gifs', {});
  t.deepEqual(gifs, []);
});

test('adds a GIF', async (t) => {
  const {root, contract} = t.context.accounts;
  await root.call(contract, 'add_gif', {'link': 'abc', 'gif_id': 'a1b2c3d4'});
  const gifs: [] = await root.call(contract, 'get_gifs', {});
  const gifCount: number = await contract.view('get_gif_count', {});
  t.is(gifCount, 1);
  t.assert(gifs.length !== 0);
});
