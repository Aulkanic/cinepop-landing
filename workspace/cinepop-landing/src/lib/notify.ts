export type SubscribeResult = { success: true } | { success: false; message: string };

export async function subscribe(_email: string): Promise<SubscribeResult> {
  const wait = 600 + Math.floor(Math.random() * 300);
  await new Promise((r) => setTimeout(r, wait));
  const fail = Math.random() < 0.05;
  if (fail) return { success: false, message: 'Something went wrong. Try again.' };
  return { success: true };
}

