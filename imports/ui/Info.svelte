<script>
    import { Infos } from "../api/user-info.js";

    import { useTracker } from "meteor/rdb:svelte-meteor-data";

    export let key;

    export let task;

    let showPrivateButton;

    $: currentUser = useTracker(() => Meteor.user());

    $: {
        showPrivateButton = false;

        if ($currentUser) {
            showPrivateButton = task.owner === $currentUser._id;
        }
    }

    function deleteThisTask() {
        Meteor.call("info.remove", task._id);
    }

    function togglePrivate() {
        Meteor.call("info.setPrivate", task._id, !task.private);
    }
</script>

<li class:private={task.private} style="list-style-type: none;">
    {task.text}

    {#if showPrivateButton}
        <button className="toggle-private" on:click={togglePrivate}>
            {task.private ? '🔒' : '🔓'}
        </button>
    {/if}

    <button class="delete" on:click={deleteThisTask}>
        🗑️
    </button>
</li>
