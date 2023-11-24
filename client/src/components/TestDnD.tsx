import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Card, Divider, Grid, Paper, Stack, Typography, alpha, styled } from '@mui/material';
import '../App.scss'
import { CancelDrop, CollisionDetection, DndContext, DroppableContainer, DragOverlay, KeyboardCode, KeyboardCoordinateGetter, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, UniqueIdentifier, closestCenter, closestCorners, getFirstCollision, pointerWithin, rectIntersection, useDraggable, useDroppable, useSensor, useSensors, Modifiers, defaultDropAnimationSideEffects, DropAnimation } from '@dnd-kit/core';
import { SortableContext, SortingStrategy, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import { createSnapModifier, restrictToHorizontalAxis } from '@dnd-kit/modifiers';


const t = {
    stats: {
        ressources: [
            100, //ph-y
            50, //ma-g
            30, //control
        ],
        abilities: {
            maxP: 12,
            currentP: 12,
            maxA: 12,
            currentA: 12,
            passives: "",
            actives: "",
        }
    }
}


const CardAb = styled(Card)({
    backgroundColor: alpha("#767676", 0.7),
    ':hover': {
        backgroundColor: alpha("#FFFFFF", 0.7)
    }
})

const SkUi = forwardRef(({ data, horizontal, idx, ...props }: any, ref: any) => {
    const { name, about } = data;


    const horizonStyle = (idx !== null && horizontal) ? {

    } : null;

    return (
        <>
            <CardAb sx={{
                width: "150px",
                height: "90px",

            }} ref={ref}>

                <Typography gutterBottom variant='h5'>
                    {name}
                </Typography>
                <Typography noWrap variant="body1">
                    {about}
                </Typography>

            </CardAb>
        </>
    )
});



function Sk({ data, id, idx = 0, horizontal = false }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


    return (
        <>
            <Box sx={{
                position: horizontal ? 'absolute' : "auto",
                left: horizontal ? `${158 * idx}px` : "auto",
                alignSelf: "center",
                my: 1,
            }} style={style} {...listeners} {...attributes}>
                <SkUi
                    horizontal={horizontal}
                    ref={setNodeRef}
                    idx={idx}
                    data={data}
                >
                </SkUi>
            </Box>
        </>
    )
}

function ContainerUI({ children, id, items, ...props }: any) {


    return (
        <>
            <Paper sx={{
                height: "200px",
                margin: "10px",
                backgroundColor: "whitesmoke",
                width: "100%"

            }} >
                <Box>
                    <Typography align='center'>Container: {id} </Typography>
                    <Divider variant='middle'></Divider>
                </Box>
                <Box sx={{ height: "70%", width: "95%", position: 'relative', mt: 2, ml: 2, overflowX: "auto" }} alignItems={"center"}>
                    {children}
                </Box>
            </Paper>
        </>
    )
}

function DropContainer({ id, children }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <>
            <Box ref={setNodeRef} sx={{ height: "100%", width: "100%" }}>
                {children}
            </Box>
        </>
    )

}


const BoxAb = styled(Box)({
    backgroundColor: alpha("#000000", 0.8),
    width: "100%",
    overflowY: "scroll",
    '&::-webkit-scrollbar': {
        width: ".5em",
    },

    '&::-webkit-scrollbar-track': {
        boxShadow: `inset 0 0 14px ${alpha("#767676", 0.7)}`,
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: "darkgrey",
        outline: "1px solid slategrey",
    },
})

const defaultItems = {
    inactiveAb: [
        {
            _id: "64f83f3352b23d6db4c33b8e",
            index: 0,
            name: "tempor adipisicing",
            about: "Deserunt reprehenderit est eiusmod ad reprehenderit proident anim minim. Sunt veniam dolor cupidatat pariatur in irure."
        },
        {
            _id: "64f83f333f6defae15c63bfe",
            index: 1,
            name: "ex proident",
            about: "Ad veniam laborum eu anim nisi sint nostrud consequat esse veniam laboris ipsum. Esse exercitation enim cupidatat voluptate culpa esse veniam dolore ullamco."
        },
        {
            _id: "64f83f33bfc18d74049648f0",
            index: 2,
            name: "laboris aliquip",
            about: "Ad laboris laboris dolore ullamco qui non et officia dolore. Labore aliquip pariatur et elit consectetur ipsum ea."
        },
        {
            _id: "64f83f331e36796c0a00d917",
            index: 3,
            name: "occaecat non",
            about: "Adipisicing eiusmod do qui ad aliqua eiusmod. Ex sit fugiat eiusmod velit nisi do quis excepteur et quis irure laboris consectetur."
        },
        {
            _id: "64f83f3386495db0b0cdb46d",
            index: 4,
            name: "exercitation id",
            about: "Occaecat id esse duis mollit officia enim consequat consequat ut officia pariatur culpa. Consequat esse commodo fugiat labore ea aliquip ea elit eu esse excepteur ipsum anim cupidatat."
        },
        {
            _id: "64f83f33688725a07ea01dca",
            index: 5,
            name: "reprehenderit anim",
            about: "Elit Lorem enim aute nulla duis sint aute quis dolore exercitation culpa tempor ex officia. Ut est incididunt anim aliqua Lorem culpa cupidatat enim ea."
        },
        {
            _id: "64f83f33c96d383ece44a476",
            index: 6,
            name: "ad est",
            about: "In do eu sunt eiusmod consequat in culpa Lorem reprehenderit consequat. Mollit tempor commodo fugiat veniam proident nisi laboris adipisicing consectetur."
        },
        {
            _id: "64f83f3322ce057f25d09d69",
            index: 7,
            name: "anim velit",
            about: "Non commodo duis deserunt nulla ex eu sint esse. Fugiat ullamco irure Lorem nisi qui ipsum id excepteur pariatur ex."
        },
        {
            _id: "64f83f33caa667fcb78b0b2c",
            index: 8,
            name: "fugiat exercitation",
            about: "Proident ex aliquip aliquip non veniam laboris ex velit ea. Nisi ut consequat ipsum reprehenderit."
        },
        {
            _id: "64f83f33ddc6a2206702fcff",
            index: 9,
            name: "minim anim",
            about: "Dolor eu nulla dolore dolore aliquip incididunt occaecat excepteur in nostrud labore do tempor duis. Sit incididunt laboris nisi nulla enim non."
        },
        {
            _id: "64f83f33899e57739d9e0ebe",
            index: 10,
            name: "fugiat fugiat",
            about: "Id tempor qui ea elit magna qui elit aute eu. Qui culpa eiusmod anim ipsum tempor."
        },
        {
            _id: "64f83f3350f3f18ef7ba7030",
            index: 11,
            name: "sit mollit",
            about: "Dolore elit dolore ea do laborum. Consequat culpa dolor adipisicing amet proident in aliqua ut minim laboris labore proident."
        },
        {
            _id: "64f83f339a1c7683c82578ce",
            index: 12,
            name: "ipsum laboris",
            about: "Ea non incididunt eu ea qui ea laborum ullamco nulla deserunt esse reprehenderit irure enim. Occaecat exercitation aliqua labore exercitation fugiat occaecat minim proident enim excepteur."
        },
        {
            _id: "64f83f3360d791c28f3bf8fc",
            index: 13,
            name: "occaecat pariatur",
            about: "Minim amet reprehenderit cupidatat qui adipisicing sit. Commodo aliqua occaecat ipsum Lorem consectetur ut."
        },
        {
            _id: "64f83f3338b3a8f8d100d4e6",
            index: 14,
            name: "proident et",
            about: "Cupidatat aliqua laborum Lorem deserunt sint mollit officia Lorem. Excepteur voluptate aliqua et consequat id consequat reprehenderit sint enim adipisicing consequat."
        },
        {
            _id: "64f83f33e35b59e6883c3ae9",
            index: 15,
            name: "ipsum dolore",
            about: "Proident sint commodo aliquip pariatur non mollit eu veniam voluptate. Ullamco non irure reprehenderit ullamco pariatur minim eiusmod commodo non."
        },
        {
            _id: "64f83f336d6c102375457112",
            index: 16,
            name: "nisi nisi",
            about: "Officia dolor quis do reprehenderit consequat sunt fugiat occaecat amet elit sint adipisicing qui. Esse sint incididunt minim veniam aute nostrud do enim sunt velit aliqua mollit do occaecat."
        },
        {
            _id: "64f83f336cb6dbc017c8359e",
            index: 17,
            name: "deserunt velit",
            about: "Eu pariatur adipisicing aliquip amet veniam dolore. Proident nulla cillum ipsum velit cillum cillum voluptate."
        },
        {
            _id: "64f83f334745d2be325f84de",
            index: 18,
            name: "aliqua eu",
            about: "Tempor fugiat ipsum commodo deserunt incididunt aliquip incididunt sit fugiat cillum. Consectetur Lorem ut ad qui occaecat ipsum pariatur quis anim ut culpa aliquip irure cupidatat."
        },
        {
            _id: "64f83f3330fb9a521d680b58",
            index: 19,
            name: "cillum velit",
            about: "Incididunt eu labore ut velit excepteur nisi. Cillum veniam cillum excepteur et proident."
        },
        {
            _id: "64f83f33918ef8272eedfe76",
            index: 20,
            name: "occaecat ipsum",
            about: "Ipsum nisi elit non aliquip labore qui sunt minim tempor fugiat pariatur veniam. In do deserunt non mollit est quis."
        },
        {
            _id: "64f83f33bbb0e43279bd074c",
            index: 21,
            name: "aliqua ut",
            about: "Esse fugiat magna magna dolore et. Ea irure sunt non enim ullamco mollit velit."
        },
        {
            _id: "64f83f33620dee870e7e01ce",
            index: 22,
            name: "id aute",
            about: "Laboris ut eu adipisicing dolor nostrud ad est officia adipisicing veniam enim nisi consequat eu. Esse excepteur labore consectetur et nulla id enim commodo."
        },
        {
            _id: "64f83f33a413e7630845dacf",
            index: 23,
            name: "aliquip anim",
            about: "Occaecat dolor mollit eiusmod ex voluptate reprehenderit aliqua dolor incididunt est nisi. Cupidatat veniam do veniam labore id aute aliqua."
        },
        {
            _id: "64f83f3397b9b71cd90c7bc6",
            index: 24,
            name: "eu ullamco",
            about: "Magna voluptate irure ex aliquip in esse amet in velit consequat sit labore deserunt. Enim proident mollit in incididunt sunt elit velit enim ex nostrud."
        }
    ], inactive: [{ name: "lol", about: "test" }, { name: "lol2", about: "test" }], A: [{ name: "test", about: "" }], B: [], C: []
};

enum MeasuringStrategy {
    Always = 0,
    BeforeDragging = 1,
    WhileDragging = 2
}

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

interface Props {
    adjustScale?: boolean;
    cancelDrop?: CancelDrop;
    columns?: number;
    containerStyle?: React.CSSProperties;
    coordinateGetter?: KeyboardCoordinateGetter;
    getItemStyles?(args: {
        value: UniqueIdentifier;
        index: number;
        overIndex: number;
        isDragging: boolean;
        containerId: UniqueIdentifier;
        isSorting: boolean;
        isDragOverlay: boolean;
    }): React.CSSProperties;
    wrapperStyle?(args: { index: number }): React.CSSProperties;
    itemCount?: number;
    items?: Items;
    handle?: boolean;
    renderItem?: any;
    strategy?: SortingStrategy;
    modifiers?: Modifiers;
    minimal?: boolean;
    trashable?: boolean;
    scrollable?: boolean;
    vertical?: boolean;
}

const directions: string[] = [
    KeyboardCode.Down,
    KeyboardCode.Right,
    KeyboardCode.Up,
    KeyboardCode.Left,
];

const multipleContainersCoordinateGetter: KeyboardCoordinateGetter = (
    event,
    { context: { active, droppableRects, droppableContainers, collisionRect } }
) => {
    if (directions.includes(event.code)) {
        event.preventDefault();

        if (!active || !collisionRect) {
            return;
        }

        const filteredContainers: DroppableContainer[] = [];

        droppableContainers.getEnabled().forEach((entry) => {
            if (!entry || entry?.disabled) {
                return;
            }

            const rect = droppableRects.get(entry.id);

            if (!rect) {
                return;
            }

            const data = entry.data.current;

            if (data) {
                const { type, children } = data;

                if (type === 'container' && children?.length > 0) {
                    if (active.data.current?.type !== 'container') {
                        return;
                    }
                }
            }

            switch (event.code) {
                case KeyboardCode.Down:
                    if (collisionRect.top < rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Up:
                    if (collisionRect.top > rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Left:
                    if (collisionRect.left >= rect.left + rect.width) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Right:
                    if (collisionRect.left + collisionRect.width <= rect.left) {
                        filteredContainers.push(entry);
                    }
                    break;
            }
        });

        const collisions = closestCorners({
            active,
            collisionRect: collisionRect,
            droppableRects,
            droppableContainers: filteredContainers,
            pointerCoordinates: null,
        });
        const closestId = getFirstCollision(collisions, 'id');

        if (closestId != null) {
            const newDroppable = droppableContainers.get(closestId);
            const newNode = newDroppable?.node.current;
            const newRect = newDroppable?.rect.current;

            if (newNode && newRect) {
                if (newDroppable.id === 'placeholder') {
                    return {
                        x: newRect.left + (newRect.width - collisionRect.width) / 2,
                        y: newRect.top + (newRect.height - collisionRect.height) / 2,
                    };
                }

                if (newDroppable.data.current?.type === 'container') {
                    return {
                        x: newRect.left + 158,
                        y: newRect.top + 20,
                    };
                }

                return {
                    x: newRect.left,
                    y: newRect.top,
                };
            }
        }
    }

    return undefined;
};

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

export default function Test({
    adjustScale = false,
    itemCount = 3,
    cancelDrop,
    columns,
    handle = false,
    items: initialItems,
    containerStyle,
    coordinateGetter = multipleContainersCoordinateGetter,
    getItemStyles = () => ({}),
    wrapperStyle = () => ({}),
    minimal = false,
    modifiers,
    renderItem,
    strategy = verticalListSortingStrategy,
    trashable = false,
    vertical = false,
    scrollable,
}: Props) {

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [dropped, setDropped] = useState(null);
    const [items, setItems] = useState<any>(getKeys(defaultItems));
    const [data, setData] = useState<any>(defaultItems);
    const [containers, setContainers] = useState(
        Object.keys(items) as UniqueIdentifier[]
    );
    const lastOverId = useRef<UniqueIdentifier | null>(null);
    const recentlyMovedToNewContainer = useRef(false);
    const isSortingContainer = activeId ? containers.includes(activeId) : false;

    function getKeys(obj) {
        let newObj = {};

        Object.keys(obj).forEach((container) => {
            newObj[container] = obj[container].map((ab) => ab.name)
        })
        console.log(newObj);

        return newObj;
    }

    function getAbData(ab) {
        for (const ctn in data) {
            let dt = data[ctn].find((cab) => cab.name === ab)
            if (dt) return dt;
        }
    }

    /**
     * Custom collision detection strategy optimized for multiple containers
     *
     * - First, find any droppable containers intersecting with the pointer.
     * - If there are none, find intersecting containers with the active draggable.
     * - If there are no intersecting containers, return the last matched intersection
     *
     */
    const collisionDetectionStrategy: CollisionDetection = useCallback(
        (args) => {
            if (activeId && activeId in items) {
                return closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(
                        (container) => container.id in items
                    ),
                });
            }

            // Start by finding any intersecting droppable
            const pointerIntersections = pointerWithin(args);
            const intersections =
                pointerIntersections.length > 0
                    ? // If there are droppables intersecting with the pointer, return those
                    pointerIntersections
                    : rectIntersection(args);
            let overId = getFirstCollision(intersections, 'id');

            if (overId != null) {
                if (overId === "trash") {
                    // If the intersecting droppable is the trash, return early
                    // Remove this if you're not using trashable functionality in your app
                    return intersections;
                }

                if (overId in items) {
                    const containerItems = items[overId];

                    // If a container is matched and it contains items (columns 'A', 'B', 'C')
                    if (containerItems.length > 0) {
                        // Return the closest droppable within that container
                        overId = closestCenter({
                            ...args,
                            droppableContainers: args.droppableContainers.filter(
                                (container) =>
                                    container.id !== overId &&
                                    containerItems.includes(container.id)
                            ),
                        })[0]?.id;
                    }
                }

                lastOverId.current = overId;

                return [{ id: overId }];
            }

            // When a draggable item moves to a new container, the layout may shift
            // and the `overId` may become `null`. We manually set the cached `lastOverId`
            // to the id of the draggable item that was moved to the new container, otherwise
            // the previous `overId` will be returned which can cause items to incorrectly shift positions
            if (recentlyMovedToNewContainer.current) {
                lastOverId.current = activeId;
            }

            // If no droppable is matched, return the last match
            return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeId, items]
    );
    const [clonedItems, setClonedItems] = useState<any | null>(null);
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );


    function findContainer(id) {
        if (id in items) {
            return id;
        }

        return Object.keys(items).find((key) => items[key].includes(id));
    }

    const onDragCancel = () => {
        if (clonedItems) {
            // Reset items to their original state in case items have been
            // Dragged across containers
            setItems(clonedItems);
        }

        setActiveId(null);
        setClonedItems(null);
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false;
        });
    }, [items]);


    return (<>
    <Box sx={{ height: "100%", width: "100%" }}>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
            onDragStart={({ active }) => {
                setActiveId(active.id);
                setClonedItems(items);
            }}
            onDragOver={({ active, over }) => {
                const overId = over?.id;

                if (overId == null || overId === "trash" || active.id in items) {
                    return;
                }

                const overContainer = findContainer(overId);
                const activeContainer = findContainer(active.id);

                if (!overContainer || !activeContainer) {
                    return;
                }

                if (activeContainer !== overContainer) {
                    setItems((items) => {
                        const activeItems = items[activeContainer];
                        const overItems = items[overContainer];
                        const overIndex = overItems.indexOf(overId);
                        const activeIndex = activeItems.indexOf(active.id);

                        let newIndex: number;

                        if (overId in items) {
                            newIndex = overItems.length + 1;
                        } else {
                            const isBelowOverItem =
                                over &&
                                active.rect.current.translated &&
                                active.rect.current.translated.top >
                                over.rect.top + over.rect.height;

                            const modifier = isBelowOverItem ? 1 : 0;

                            newIndex =
                                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
                        }

                        recentlyMovedToNewContainer.current = true;

                        return {
                            ...items,
                            [activeContainer]: items[activeContainer].filter(
                                (item) => item !== active.id
                            ),
                            [overContainer]: [
                                ...items[overContainer].slice(0, newIndex),
                                items[activeContainer][activeIndex],
                                ...items[overContainer].slice(
                                    newIndex,
                                    items[overContainer].length
                                ),
                            ],
                        };
                    });
                }
            }}
            onDragEnd={({ active, over }) => {
                if (active.id in items && over?.id) {
                    setContainers((containers) => {
                        const activeIndex = containers.indexOf(active.id);
                        const overIndex = containers.indexOf(over.id);

                        return arrayMove(containers, activeIndex, overIndex);
                    });
                }

                const activeContainer = findContainer(active.id);

                if (!activeContainer) {
                    setActiveId(null);
                    return;
                }

                const overId = over?.id;

                if (overId == null) {
                    setActiveId(null);
                    return;
                }

                if (overId === "trash") {
                    setItems((items) => ({
                        ...items,
                        [activeContainer]: items[activeContainer].filter(
                            (id) => id !== activeId
                        ),
                    }));
                    setActiveId(null);
                    return;
                }

                if (overId === "placeholder") {
                    const newContainerId = getNextContainerId();

                    unstable_batchedUpdates(() => {
                        setContainers((containers) => [...containers, newContainerId]);
                        setItems((items) => ({
                            ...items,
                            [activeContainer]: items[activeContainer].filter(
                                (id) => id !== activeId
                            ),
                            [newContainerId]: [active.id],
                        }));
                        setActiveId(null);
                    });
                    return;
                }

                const overContainer = findContainer(overId);

                if (overContainer) {
                    const activeIndex = items[activeContainer].indexOf(active.id);
                    const overIndex = items[overContainer].indexOf(overId);

                    if (activeIndex !== overIndex) {
                        setItems((items) => ({
                            ...items,
                            [overContainer]: arrayMove(
                                items[overContainer],
                                activeIndex,
                                overIndex
                            ),
                        }));
                    }
                }

                setActiveId(null);
            }}
            cancelDrop={cancelDrop}
            onDragCancel={onDragCancel}
            modifiers={[]}
        >

            

                <Grid container>
                    <Grid container item xs={3}>
                        <BoxAb>
                            <SortableContext items={items.inactiveAb}
                                strategy={verticalListSortingStrategy}>
                                <DropContainer id={"inactiveAb"}>
                                    {items.inactiveAb.length > 0
                                        ? items.inactiveAb.map((elem) => <Sk key={elem} id={elem} data={getAbData(elem)} />)
                                        : <Box sx={{ minWidth: "90px", margin: "auto", minHeight: "30%", backgroundColor: alpha("#ffda6c", 0.6) }}>
                                        </Box>}
                                </DropContainer>
                            </SortableContext>
                        </BoxAb>
                    </Grid>
                    <Grid container item xs={9}>
                        <Box sx={{ backgroundColor: alpha("#767676", 0.7), height: "100%", width: "100%"}}>
                            {containers.map((container) => {
                                return ((container === "inactiveAb")
                                    ? null
                                    : <ContainerUI key={container} >
                                        <SortableContext items={items[container]}
                                            strategy={horizontalListSortingStrategy}>
                                            <DropContainer id={container}>

                                                {items[container].map((elem, idx) => {
                                                    return <Sk horizontal idx={idx} key={`${container}-${elem}`} id={elem} data={getAbData(elem)} />

                                                })}
                                            </DropContainer>
                                        </SortableContext>
                                    </ContainerUI>
                                )
                            })}
                        </Box>
                    </Grid>
                </Grid>

                {createPortal(
                    <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
                        {activeId
                            ? containers.includes(activeId)
                                ? <ContainerUI />
                                : <SkUi data={getAbData(activeId)} />
                            : null}
                    </DragOverlay>,
                    document.body
                )}

        </DndContext>
            </Box>

    </>)


    function handleRemove(containerID: UniqueIdentifier) {
        setContainers((containers) =>
            containers.filter((id) => id !== containerID)
        );
    }

    function handleAddColumn() {
        const newContainerId = getNextContainerId();

        unstable_batchedUpdates(() => {
            setContainers((containers) => [...containers, newContainerId]);
            setItems((items) => ({
                ...items,
                [newContainerId]: [],
            }));
        });
    }

    function getNextContainerId() {
        const containerIds = Object.keys(items);
        const lastContainerId = containerIds[containerIds.length - 1];

        return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
    }


    function getColor(id: UniqueIdentifier) {
        switch (String(id)[0]) {
            case 'A':
                return '#7193f1';
            case 'B':
                return '#ffda6c';
            case 'C':
                return '#00bcd4';
            case 'D':
                return '#ef769f';
        }

        return undefined;
    }
}