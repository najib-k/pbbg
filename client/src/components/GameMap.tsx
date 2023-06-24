import React, { useEffect, useState, useRef, useLayoutEffect, forwardRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import CSS from 'csstype';
import { SxProps } from '@mui/material/styles';
import TilePopover from '../gameMap/TilePopover';
import { bindHover, usePopupState } from 'material-ui-popup-state/hooks';
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";
import useSWR from 'swr';
import { useActionData } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { usePlayer } from '../api/apiHooks';

interface ITyleType {
    name: string,
    color: CSS.Property.Color | string,
}

const DEFAULT_TILES: ITyleType[] =
    [
        { name: "water", color: "blue" },
        { name: "land", color: "green" },
        { name: "forest", color: "darkgreen" },
    ];

function battling() {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("AuthProviderToken")}` },
    };
    fetch('action/test', requestOptions).then(response => { return response.json() });

}

const Tile = forwardRef(function Tile({ tile, pos, size: { width, height }, boxRef }: {
    tile: number,
    pos: { x: number, y: number },
    size: any,
    boxRef: any,
}, ref: any) {
    const popupState = usePopupState({ variant: 'popper', popupId: `tilePopover${pos.x}-${pos.y}` });
    const { player, error, isLoading } = usePlayer();

    let pPos = (player.pos.x === pos.x && player.pos.y === pos.y);

    let style: SxProps = {
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
        top: `${(width * pos.x)}px`,
        left: `${(height * pos.y)}px`,
        backgroundColor: pPos ? "whitesmoke" : DEFAULT_TILES[tile].color,
    };

    return (
        <>
            <Box ref={(pPos) ? boxRef : null} {...bindHover(popupState)} onClick={() => battling()} sx={style} id={(pPos) ? "player-pos" : ""}>
            </Box>
            <TilePopover {...pos} terrain={DEFAULT_TILES[tile].name} popupState={popupState} player={pPos ? player : null} />
        </>
    )
})

interface IMap {
    width: number,
    height: number,
    tileSize: {
        width: number,
        height: number,
    },
    tilemap: Array<Array<number>>,
}

const map: IMap = {
    width: 20,
    height: 20,
    tileSize: {
        width: 40,
        height: 40,
    },
    tilemap: [
        [1, 0, 1, 2, 2, 1, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 1],
        [2, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2, 0, 0, 0, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 1, 2],
        [1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 0, 1],
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 1, 2, 1, 1, 2, 2, 1, 0, 0],
        [1, 0, 1, 2, 2, 1, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 1],
        [2, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2, 0, 0, 0, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 1, 2],
        [1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 0, 1],
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 1, 2, 1, 1, 2, 2, 1, 0, 0],
        [1, 0, 1, 2, 2, 1, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 1],
        [2, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2, 0, 0, 0, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 1, 2],
        [1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 0, 1],
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 1, 2, 1, 1, 2, 2, 1, 0, 0],
        [1, 0, 1, 2, 2, 1, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 1],
        [2, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2, 0, 0, 0, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 1, 2],
        [1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 0, 1],
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 1, 2, 1, 1, 2, 2, 1, 0, 0],
    ]
}

function usePlayerTest() {
    const [player, _] = useState({
        pos: {
            x: 14,
            y: 19,
        },
        name: "test",
        path: [
            { x: 2, y: 3 },
            { x: 6, y: 6 },
            { x: 2, y: 4 },

        ]
    });

    return player;
}

export default function GameMap() {
    const [worldMap, setWorldMap] = useState<IMap | null>(null);
    const [tiles, setTiles] = useState(null);
    const boxRef = useRef(null);
    const wrapRef = useRef<ReactZoomPanPinchContentRef | null>(null);
    const { player, error, isLoading } = usePlayer();

    const updatePath = useCallback(() => {
        const canvas: any = document.getElementById("mapCanvas");
        if (!canvas || !worldMap || !player?.path) return; //maybe alert
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 4;
        let { tileSize: { height, width } } = worldMap;
        let { pos } = player;
        console.log("w: " + (width * pos.x) + " | h: " + (height * pos.y));
        ctx.moveTo((width * pos.x) + width / 2, (height * pos.y) + height / 2)
        player.path.forEach(({ x, y }, idx) => {
            console.log("w: " + (width * x) + " | h: " + (height * y))
            ctx.lineTo((width * x) + (width / 2), (height * y) + (height / 2));
        });
        ctx.stroke();
    }, [player, worldMap])

    useEffect(() => {
        setWorldMap(map);

    }, []);

    // this should be a reducer
    useEffect(() => {

        //render map
        function renderTiles() {
            let tileList: any;
            if (worldMap) {
                tileList = worldMap!.tilemap.map((row, x) => {
                    return row.map((tile, y) => {
                        return <Tile boxRef={boxRef} key={`tile-${x}-${y}`} tile={tile} pos={{ x, y }} size={worldMap.tileSize}></Tile>
                    })
                })
            }
            setTiles(tileList);
        }
        renderTiles();

        //zoom to player tile
        if (worldMap && boxRef.current && wrapRef.current) {
            wrapRef.current.zoomToElement(boxRef.current, 1, 0);
        }

        //update ui pathing.
        updatePath();


        return () => {

        };
    }, [worldMap, boxRef, wrapRef, updatePath])

    /*     useEffect(() => {
        scrroll to particular element
        let section = document.querySelector('#player-pos');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, []) */

    if (isLoading) return (<>Loading...</>);
    if (error) return (<>Error: {error}</>);
    return (

        <TransformWrapper
            initialScale={1}
            maxScale={2}
            minScale={.3}
            limitToBounds={false}
            maxPositionY={Math.floor(player.pos.y * 40)}
            maxPositionX={Math.floor(player.pos.x * 40)}
            ref={wrapRef}
        >
            <Box sx={{ width: "100%", height: "100%", overflow: "hidden", }}>
                <TransformComponent wrapperStyle={{ position: "relative", width: "100%", height: "100%", backgroundColor: "azure" }}>

                    {tiles}
                    <canvas id="mapCanvas" style={{ position: "absolute", backgroundColor: 'transparent', top: "0", left: "0", pointerEvents: "none" }} width={`${(worldMap?.tileSize.width || 0) * (worldMap?.width || 0)}`} height={`${(worldMap?.tileSize.height || 0) * (worldMap?.height || 0)}`} role='presentation'>

                    </canvas>
                </TransformComponent>

            </Box>


        </TransformWrapper>
    )
}