import { SignUp } from '@clerk/nextjs'

export const metadata = {
  title: "Sign Up",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <SignUp />
}
