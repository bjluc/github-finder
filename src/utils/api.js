import axios from 'axios'

const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
const githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET

export const searchUsers = async (text) => {
  try {
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    )
    return res.data.items
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}
