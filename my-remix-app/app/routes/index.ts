// app/routes/index.ts

import type { LoaderFunction} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return redirect('/')
}