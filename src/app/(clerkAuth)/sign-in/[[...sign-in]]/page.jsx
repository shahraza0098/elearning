import { SignIn } from '@clerk/nextjs'

export const metadata = {
  title: "Sign In",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <SignIn />
}
