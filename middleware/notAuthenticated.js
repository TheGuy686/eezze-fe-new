export default function ({ app, redirect }) {
  // If the user is authenticated redirect to home page
  if (app.$auth.loggedIn) {
    return redirect({ name: 'index' })
  }
}
