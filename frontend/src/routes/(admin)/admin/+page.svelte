<script>
    import { hostName} from '$lib/stores.js'
    export let data;

    const userList = data.userList

    async function drop(userId) {
        const token = document.cookie.split('token=')[1].split(';')[0]

		const response = await fetch(`${$hostName}/admin/${userId}`, {
			method: 'delete',
			headers: {
				Authorization: `Bearer ${token}`
			},
		});

        location.href = '/admin'
    }
</script>

<article>
    <h3>모든 유저</h3>
    <hr>
    {#each userList as user}
    <nav>
        <ul>
            <li><a href="/users/user_id/{user.id}" class="contrast">{user.nickname} [{user.username}]</a></li>
        </ul>
        <ul>
            <li><button on:click={()=>drop(user.id)}>추방하기</button></li>
        </ul>
    </nav>
    <hr>
    {/each}
</article>
