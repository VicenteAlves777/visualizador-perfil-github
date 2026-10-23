const inputSearch = document.getElementById('input-search')
const btnSearch = document.getElementById('btn-search')
const profileResults = document.querySelector('.profile-results')


const baseUrl = 'https://api.github.com'

btnSearch.addEventListener('click', async () => {
    const userName = inputSearch.value

    if (userName) {
         profileResults.innerHTML = `
            <div class="loading">
                <p>Carregando...</p>
            </div>`
        try {
            const response = await fetch(`${baseUrl}/users/${userName}`)

            if (!response.ok) {
                alert('Usuário não encontrado. Por favor, verifique se o nome de usuário foi digitado corretamente e tente novamente.')
                profileResults.innerHTML = ""
                return
            }

            const userData = await response.json()

            console.log(userData.avatar_url)
            console.log(userData.name)
            console.log(userData.bio)
            console.log(userData.followers)
            console.log(userData.following)

            profileResults.innerHTML = `
            <div class="profile-card">
                <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
                <div class="profile-info">
                    <h2>${userData.name}</h2>
                    <p>${userData.bio || 'Não possui bio cadastrada.'}</p>
                </div>
            </div>`
        } catch (error) {
            profileResults.innerHTML = ""
            console.error('Erro ao buscar o perfil do usuario', error)
            alert('Ocorreu um erro ao buscar o perfil do usuario. Por favor, tente novamente mais tarde.')
        }

    } else {
        alert('Por favor, digite um nome de usuário do GitHub')
    }
})