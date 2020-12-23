const fetch = require('node-fetch')

exports.handler = async (event, context) => {

  const { user, identity } = context.clientContext
  const { action, role } = JSON.parse(event.body)

  const userUrl = `${identity.url}/admin/users/${user.sub}`
  const adminAuthorization = `Bearer ${identity.token}`

  console.log(`Updating roles for ${user.email}: ${action} ${role}`)

  // TODO: Make sure this doesn't error on totally new users (default roles is []?)
  const currentRoles = user.app_metadata.roles || []
  const payload = {
    app_metadata: {
      ...user.app_metadata,
      roles: action == 'add'
        ? currentRoles.concat(role)
        : currentRoles.filter(r => r !== role)
    }
  }

  // console.log(`payload: ${JSON.stringify(payload)}`)
  // console.log(`PUT'ing to ${userUrl}`)
  // console.log(`Auth: ${adminAuthorization}`)

  await fetch(userUrl, {
    method: 'PUT',
    headers: {
      Authorization: adminAuthorization,
    },
    body: JSON.stringify(payload)
  })
    // .then(resp => resp.json())
    // .then(user => console.log(JSON.stringify(user)))

  return {
    statusCode: 200
  }
}