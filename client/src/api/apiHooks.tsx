import useSWR from 'swr';

const fetcher = (url, options) => fetch(url, options = undefined).then(res => res.json());

function usePlayer() {
    //const { data, error, isLoading } = useSWR(`/player/getData`, { refreshInterval: 6000 });
    let t = new Date(Date.now() + 6000);
    const data = {action: {name: "Test", endDate: t, duration: 6000 }}
    return {
        player: data,
        isLoading: false,
        isError: false,
    }
}

export {
    usePlayer,
}