export default function ({ app, redirect }) {
  // If the user is not authenticated
  if (!app.$auth.loggedIn) {
    return redirect({ name: 'login' })
  }
}
