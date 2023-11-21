<script>
    import {page} from '$app/stores.js'
    import {user, hostName} from '$lib/stores.js'
    export let data;

    $user = data.user.data;
    $: imageUrl = `${$hostName}${$user.image}`

    async function drop() {
        const token = document.cookie.split('token=')[1].split(';')[0]

		const response = await fetch(`${$hostName}/users/${$page.params.userId}`, {
			method: 'delete',
			headers: {
				Authorization: `Bearer ${token}`
			},
		});

        location.href = '/auth/login'
    }
</script>

<article class="grid">
    <div>
        <div class="title">
            <h3>{$user.nickname}</h3>
            <img src={imageUrl} alt="">
        </div>
        <input type="text" style="opacity: 0; cursor: default;">
        <button class="contrast" on:click={()=>location.href = `/users/${$user.id}/modify`}>
            수정하기
        </button>
            <button class="secondary" on:click={drop}>탈퇴하기</button>
    </div>
</article>

<style>
    .title {
        text-align: center;
    }
    article {
        margin: 48px 0;
    }
    img {
        width: 80%;
    }
</style>