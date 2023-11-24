import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Panel,
    BackgroundVariant,
    ReactFlowProvider,
    useStoreApi,
    Handle,
    Position,
    ReactFlowInstance,
    getOutgoers,
    useEdges,
    useNodes,
    getIncomers,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { CircularProgress } from '@mui/material';

const initialNodes = [
    { id: 'root', type: "abRoot", position: { x: 0, y: 0 }, data: { cost: 0, totalCost: 0 } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const defaultItems = {
    inactiveAb: [
        {
            _id: "64fb3e8c943497b91938c795",
            index: 0,
            name: "laborum voluptate",
            about: "Aute non culpa sunt sint exercitation enim mollit ullamco cupidatat anim ut. Incididunt laborum dolor elit voluptate quis ut aliquip dolore irure nostrud laboris.",
            type: 2,
            cost: 8,
            network: "dolor",
            color: "#259493",
            effects: [
                {
                    type: 3
                },
                {
                    type: 0
                }
            ]
        },
        {
            _id: "64fb3e8c2b33f8390256597d",
            index: 1,
            name: "dolore dolore",
            about: "Velit officia tempor duis elit laborum Lorem duis minim qui aute consequat. In nisi magna dolor et adipisicing proident labore.",
            type: 3,
            cost: 6,
            network: "veniam",
            color: "#ede74c",
            effects: [
                {
                    type: 9
                },
                {
                    type: 2
                }
            ]
        },
        {
            _id: "64fb3e8cdf8ac94ed8b24076",
            index: 2,
            name: "nulla minim",
            about: "Enim eiusmod eu eu dolore enim officia officia enim laboris minim. Incididunt veniam irure magna proident proident nulla.",
            type: 0,
            cost: 6,
            network: "labore",
            color: "#b6d204",
            effects: [
                {
                    type: 6
                }
            ]
        },
        {
            _id: "64fb3e8c9dba3d00db708e39",
            index: 3,
            name: "ut non",
            about: "Adipisicing ea enim irure incididunt nulla fugiat. Voluptate Lorem magna velit qui officia pariatur reprehenderit.",
            type: 1,
            cost: 10,
            network: "fugiat",
            color: "#351a35",
            effects: [
                {
                    type: 1
                },
                {
                    type: 3
                },
                {
                    type: 9
                }
            ]
        },
        {
            _id: "64fb3e8cf951dd1ed2fb1a89",
            index: 4,
            name: "proident aliqua",
            about: "Eiusmod irure et sint aliqua pariatur aliqua id id nostrud officia. Mollit aliqua mollit sunt ex.",
            type: 2,
            cost: 6,
            network: "laboris",
            color: "#74fb3c",
            effects: [
                {
                    type: 4
                },
                {
                    type: 7
                }
            ]
        },
        {
            _id: "64fb3e8c758eef21887101ae",
            index: 5,
            name: "eiusmod do",
            about: "Ea et ea fugiat deserunt qui aliquip ea ad aliqua ad elit. Adipisicing officia enim nostrud consectetur do ut excepteur velit ullamco elit.",
            type: 0,
            cost: 4,
            network: "dolore",
            color: "#bb9925",
            effects: []
        },
        {
            _id: "64fb3e8c9d3de5496228bbe3",
            index: 6,
            name: "adipisicing aute",
            about: "Cillum esse duis occaecat fugiat incididunt ut nulla dolore enim pariatur qui ad. Ex adipisicing commodo deserunt quis mollit eu dolore enim et incididunt excepteur magna et non.",
            type: 1,
            cost: 4,
            network: "enim",
            color: "#b6f53b",
            effects: [
                {
                    type: 6
                },
                {
                    type: 9
                }
            ]
        },
        {
            _id: "64fb3e8c37aff7ed6673754a",
            index: 7,
            name: "eu ad",
            about: "Eiusmod ut irure quis voluptate id veniam commodo. Sint labore tempor anim officia.",
            type: 3,
            cost: 9,
            network: "dolor",
            color: "#a26881",
            effects: [
                {
                    type: 6
                },
                {
                    type: 5
                },
                {
                    type: 1
                }
            ]
        },
        {
            _id: "64fb3e8c4a46edfe53006cd8",
            index: 8,
            name: "proident proident",
            about: "Deserunt velit proident reprehenderit sint anim quis consequat reprehenderit velit duis in pariatur nulla. Ea est enim ad officia velit esse irure eu duis cupidatat incididunt pariatur sint reprehenderit.",
            type: 3,
            cost: 10,
            network: "voluptate",
            color: "#3f03f8",
            effects: [
                {
                    type: 1
                },
                {
                    type: 8
                },
                {
                    type: 2
                }
            ]
        },
        {
            _id: "64fb3e8c79672b91232759a8",
            index: 9,
            name: "laborum ea",
            about: "Quis ex mollit magna deserunt nisi ut excepteur. Cillum reprehenderit ea eu ea veniam et nisi tempor.",
            type: 2,
            cost: 7,
            network: "veniam",
            color: "#a2c77d",
            effects: [
                {
                    type: 0
                },
                {
                    type: 3
                }
            ]
        },
        {
            _id: "64fb3e8ca3b4a490076dc951",
            index: 10,
            name: "excepteur aliqua",
            about: "Minim qui eiusmod laborum qui commodo est sit eiusmod minim. Cupidatat sint irure consectetur aute elit enim ea in.",
            type: 1,
            cost: 9,
            network: "adipisicing",
            color: "#601711",
            effects: [
                {
                    type: 5
                }
            ]
        },
        {
            _id: "64fb3e8c4bf7f8914f24af2a",
            index: 11,
            name: "aliquip amet",
            about: "Commodo nostrud ut proident ad ipsum ullamco velit aute est incididunt sunt cupidatat velit. In adipisicing id voluptate ad adipisicing aute voluptate officia enim laborum.",
            type: 0,
            cost: 4,
            network: "veniam",
            color: "#3445fb",
            effects: []
        },
        {
            _id: "64fb3e8ced135d472a250ef9",
            index: 12,
            name: "aliquip pariatur",
            about: "Exercitation duis ad labore sunt eiusmod esse amet mollit consectetur labore. Nostrud cillum laboris adipisicing sunt laborum do ex.",
            type: 3,
            cost: 6,
            network: "sunt",
            color: "#9add6f",
            effects: [
                {
                    type: 8
                },
                {
                    type: 1
                },
                {
                    type: 6
                }
            ]
        },
        {
            _id: "64fb3e8c8745ad8a03988b2d",
            index: 13,
            name: "tempor eiusmod",
            about: "Ut enim sit culpa fugiat et irure irure proident magna non amet velit. Duis do duis veniam consectetur.",
            type: 1,
            cost: 6,
            network: "reprehenderit",
            color: "#e7f567",
            effects: []
        },
        {
            _id: "64fb3e8c6f1cdb06cea036c1",
            index: 14,
            name: "Lorem anim",
            about: "Deserunt exercitation reprehenderit irure sint adipisicing pariatur. In voluptate exercitation reprehenderit cillum ad ullamco exercitation mollit ullamco esse dolor.",
            type: 1,
            cost: 6,
            network: "sit",
            color: "#658495",
            effects: [
                {
                    type: 10
                },
                {
                    type: 7
                },
                {
                    type: 1
                }
            ]
        },
        {
            _id: "64fb3e8c4bc28c394acd3137",
            index: 15,
            name: "veniam ut",
            about: "Nostrud est exercitation in tempor est eu minim ullamco ex culpa nulla non nostrud. Minim proident dolor duis in quis consequat deserunt sit enim.",
            type: 3,
            cost: 9,
            network: "est",
            color: "#5c0d73",
            effects: [
                {
                    type: 9
                }
            ]
        },
        {
            _id: "64fb3e8c39effcd5b5d2893b",
            index: 16,
            name: "in proident",
            about: "Consectetur anim ea ea enim officia cillum duis commodo ut ipsum. Amet velit fugiat dolor tempor eiusmod.",
            type: 2,
            cost: 10,
            network: "in",
            color: "#4a1cf6",
            effects: [
                {
                    type: 9
                }
            ]
        },
        {
            _id: "64fb3e8c9145188a658248ec",
            index: 17,
            name: "nisi do",
            about: "Officia est commodo tempor labore aliquip irure laborum eu. Dolor duis dolore non cupidatat dolore veniam commodo non cillum exercitation non.",
            type: 3,
            cost: 9,
            network: "sit",
            color: "#e17a4a",
            effects: [
                {
                    type: 10
                }
            ]
        },
        {
            _id: "64fb3e8ce064af0c14be2f62",
            index: 18,
            name: "velit commodo",
            about: "Esse sunt excepteur ut cupidatat minim anim incididunt occaecat. Adipisicing nulla deserunt nulla sunt id.",
            type: 0,
            cost: 4,
            network: "aliquip",
            color: "#dfc720",
            effects: []
        },
        {
            _id: "64fb3e8c5f196a40210a3833",
            index: 19,
            name: "duis est",
            about: "Fugiat dolor eu amet dolor et dolor pariatur deserunt deserunt laboris nostrud sunt. Eiusmod velit nostrud elit est dolore tempor veniam nostrud deserunt laboris velit magna Lorem aute.",
            type: 3,
            cost: 8,
            network: "quis",
            color: "#f56748",
            effects: [
                {
                    type: 7
                },
                {
                    type: 0
                },
                {
                    type: 0
                }
            ]
        },
        {
            _id: "64fb3e8c7f1c51a88476abf0",
            index: 20,
            name: "laborum id",
            about: "Aute aliqua est amet aliqua do. Ut dolor eu ullamco sunt ullamco ut aute duis anim incididunt.",
            type: 0,
            cost: 10,
            network: "et",
            color: "#9da4c5",
            effects: []
        },
        {
            _id: "64fb3e8c6cfb54fda5926015",
            index: 21,
            name: "sit nostrud",
            about: "Officia aliquip cillum exercitation nostrud non laboris eiusmod commodo ullamco minim ad nulla culpa. Mollit deserunt commodo laborum occaecat dolore cupidatat non sit officia ipsum.",
            type: 0,
            cost: 7,
            network: "amet",
            color: "#34b630",
            effects: [
                {
                    type: 3
                },
                {
                    type: 8
                },
                {
                    type: 6
                }
            ]
        },
        {
            _id: "64fb3e8c4c66ac5781ce19e1",
            index: 22,
            name: "sint incididunt",
            about: "Minim et ad amet consequat deserunt proident. Minim velit excepteur incididunt id dolore officia sint non est veniam proident voluptate sint amet.",
            type: 3,
            cost: 10,
            network: "cillum",
            color: "#331c1d",
            effects: []
        },
        {
            _id: "64fb3e8c3be066dd411d02a6",
            index: 23,
            name: "ad est",
            about: "Duis eiusmod proident consectetur pariatur sint ipsum occaecat non Lorem. Reprehenderit commodo sunt nisi velit elit tempor nisi anim nostrud est fugiat cillum est.",
            type: 3,
            cost: 6,
            network: "elit",
            color: "#578b2c",
            effects: [
                {
                    type: 5
                }
            ]
        },
        {
            _id: "64fb3e8c041729a3cb4c4e20",
            index: 24,
            name: "commodo exercitation",
            about: "Laboris officia nostrud deserunt deserunt deserunt exercitation mollit ut Lorem id. Laborum esse non magna ea incididunt duis anim officia laboris nisi in duis.",
            type: 3,
            cost: 6,
            network: "dolor",
            color: "#9c76b6",
            effects: [
                {
                    type: 4
                }
            ]
        },
        {
            _id: "64fb3e8c6f6b3436e05ee7bc",
            index: 25,
            name: "minim consectetur",
            about: "Eiusmod duis aliquip enim ullamco deserunt nisi Lorem non dolore aliquip voluptate aliquip consectetur. Tempor voluptate sit dolore veniam anim duis quis ipsum proident minim aute.",
            type: 2,
            cost: 7,
            network: "pariatur",
            color: "#3eca6a",
            effects: [
                {
                    type: 4
                },
                {
                    type: 3
                },
                {
                    type: 9
                }
            ]
        },
        {
            _id: "64fb3e8c1e87987b08ea2994",
            index: 26,
            name: "eu qui",
            about: "Cillum proident ut consequat minim nostrud mollit ipsum esse et commodo aliquip. Enim voluptate pariatur eu id.",
            type: 2,
            cost: 10,
            network: "ipsum",
            color: "#b724b7",
            effects: [
                {
                    type: 0
                },
                {
                    type: 1
                },
                {
                    type: 8
                }
            ]
        },
        {
            _id: "64fb3e8cf765c8bc7ef17b7a",
            index: 27,
            name: "elit in",
            about: "Aliquip et exercitation enim cupidatat. Pariatur aliquip elit minim aliquip proident non non elit.",
            type: 0,
            cost: 4,
            network: "tempor",
            color: "#1a6987",
            effects: [
                {
                    type: 8
                }
            ]
        },
        {
            _id: "64fb3e8c08cbfe7309ee9413",
            index: 28,
            name: "aute nulla",
            about: "Mollit ad laborum ullamco cillum et cillum cillum. Sint eu nisi excepteur elit commodo adipisicing ea cillum consequat ut.",
            type: 2,
            cost: 6,
            network: "pariatur",
            color: "#867c5f",
            effects: [
                {
                    type: 5
                }
            ]
        },
        {
            _id: "64fb3e8c5f96af7c295827c2",
            index: 29,
            name: "ad Lorem",
            about: "Nulla esse irure velit fugiat ipsum. Qui dolor dolore tempor occaecat nostrud sint laboris duis enim commodo.",
            type: 2,
            cost: 5,
            network: "cupidatat",
            color: "#9346bc",
            effects: [
                {
                    type: 4
                },
                {
                    type: 10
                }
            ]
        },
        {
            _id: "64fb3e8c90c70d04e2642e58",
            index: 30,
            name: "ut est",
            about: "Amet et enim amet velit anim labore eu do officia eu. Reprehenderit aliqua incididunt consectetur deserunt amet et officia nisi fugiat ipsum nisi consectetur.",
            type: 0,
            cost: 7,
            network: "qui",
            color: "#7822b",
            effects: [
                {
                    type: 4
                },
                {
                    type: 7
                }
            ]
        },
        {
            _id: "64fb3e8cd6de1c03076e5826",
            index: 31,
            name: "qui ea",
            about: "Reprehenderit deserunt aute ex Lorem occaecat laborum. Enim dolore irure officia sint ex consequat mollit nostrud sint mollit.",
            type: 1,
            cost: 9,
            network: "ut",
            color: "#9e395a",
            effects: [
                {
                    type: 7
                },
                {
                    type: 7
                }
            ]
        },
        {
            _id: "64fb3e8ce3cf567d0049630b",
            index: 32,
            name: "irure quis",
            about: "Labore do ullamco laborum laboris est fugiat. Aliquip dolore exercitation magna officia.",
            type: 1,
            cost: 5,
            network: "irure",
            color: "#cbfe2a",
            effects: [
                {
                    type: 0
                }
            ]
        },
        {
            _id: "64fb3e8c05648b4a51e9d914",
            index: 33,
            name: "aute culpa",
            about: "Consectetur labore in enim consequat sint ipsum officia pariatur consequat deserunt proident. Elit occaecat do quis pariatur excepteur ullamco mollit exercitation sunt ad irure exercitation.",
            type: 2,
            cost: 9,
            network: "commodo",
            color: "#c3df73",
            effects: [
                {
                    type: 3
                }
            ]
        },
        {
            _id: "64fb3e8cf609e2e1630415a1",
            index: 34,
            name: "qui culpa",
            about: "Veniam culpa laboris irure reprehenderit eu nulla ea irure do proident. Ullamco ullamco irure enim nulla minim veniam commodo exercitation nisi occaecat voluptate.",
            type: 0,
            cost: 5,
            network: "minim",
            color: "#e22d1c",
            effects: [
                {
                    type: 5
                }
            ]
        },
        {
            _id: "64fb3e8c5ef7e6987ecd6811",
            index: 35,
            name: "et laboris",
            about: "Duis in mollit esse minim Lorem do occaecat ut fugiat. Nostrud labore aliquip ullamco consectetur culpa proident aute ipsum fugiat Lorem voluptate sunt duis irure.",
            type: 1,
            cost: 6,
            network: "duis",
            color: "#b914ba",
            effects: []
        },
        {
            _id: "64fb3e8c592effb6156f6121",
            index: 36,
            name: "veniam ipsum",
            about: "Fugiat esse ipsum ipsum magna. Nisi in eu amet aliqua cillum.",
            type: 3,
            cost: 8,
            network: "sint",
            color: "#c1357c",
            effects: [
                {
                    type: 10
                },
                {
                    type: 5
                }
            ]
        },
        {
            _id: "64fb3e8c0060af0da024471b",
            index: 37,
            name: "esse id",
            about: "Labore ea mollit incididunt in cillum aliqua ex fugiat adipisicing ad culpa. Mollit amet ullamco incididunt cupidatat do ad do nisi esse voluptate commodo occaecat.",
            type: 0,
            cost: 6,
            network: "nostrud",
            color: "#2f5e41",
            effects: [
                {
                    type: 5
                },
                {
                    type: 10
                }
            ]
        },
        {
            _id: "64fb3e8c9aef925db70f2995",
            index: 38,
            name: "magna deserunt",
            about: "Adipisicing sunt laborum do fugiat ullamco cupidatat nostrud elit aliqua veniam. Anim proident ex dolor incididunt culpa aute commodo cupidatat aliqua consectetur in voluptate laboris.",
            type: 1,
            cost: 8,
            network: "est",
            color: "#8edbbb",
            effects: []
        },
        {
            _id: "64fb3e8c83759bd5db68f15a",
            index: 39,
            name: "duis commodo",
            about: "Laboris fugiat cillum magna consequat culpa nulla est nostrud officia. Elit reprehenderit do et ex nulla mollit nulla sit voluptate in reprehenderit sunt excepteur aliqua.",
            type: 2,
            cost: 8,
            network: "cupidatat",
            color: "#cdff23",
            effects: [
                {
                    type: 5
                }
            ]
        }
    ], inactive: [{ name: "lol", about: "test" }, { name: "lol2", about: "test" }], A: [{ name: "test", about: "" }], B: [], C: []
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const overflowNoScrollbar: CSSObject = {
    overflow: "auto",
    '&::-webkit-scrollbar': { //chrom, safari, opera
        display: "none"
    },
    msOverflowStyle: "none",  /* IE and Edge */
    scrollbarWidth: "none",  /* Firefox */
};
const slColors = [
    "black",
    "black",
    "black",
    "black",
    "red",
    "blue",
    "green",
    "yellow"
]

let gId = 0;
const getId = () => `dndnode_${gId++}`;
const MIN_DISTANCE = 100;

function AbNode({ data, id }) {
    let { slId, color, cost, name, getNode, totalCost = cost, updateNodes } = data;

    const nodes = useNodes();
    const edges = useEdges();
    const selfN: any = nodes.find((n) => n.id === id) || nodes[0];
    let ins = getIncomers(selfN, nodes, edges);
    let outs = getOutgoers(selfN, nodes, edges);

    useEffect(() => {
        console.log("toto")

        let newnodes = {};
        selfN.data.totalCost = cost;
        ins.forEach((i: any) => selfN.data.totalCost += i?.data.totalCost);
        newnodes[id] = selfN;

        updateNodes(newnodes)

        return () => {
            outs.forEach((o: any) => {
                o.data = { ...o.data, totalCost: o.data.totalCost - totalCost };
                newnodes[o.id] = o;
            })
            updateNodes(newnodes);
        }

    }, [edges, data])

    return (
        <Box>

            <Handle type="target" position={Position.Top} />
            <Box sx={{ width: "70px", height: "70px", borderRadius: "50%", border: `5px solid color-mix(in srgb, ${slColors[slId]} 70%, ${color})`, backgroundColor: "white" }}>
                <Typography align="center" variant='body1'>{name}</Typography>
                <Divider>ticks</Divider>
            </Box>
            <Handle type="source" position={Position.Bottom} id="out" />
        </Box>
    );
}

function AbRoot({ data }) {
    return (
        <Box>

            <Handle type="target" position={Position.Top} />
            <Box sx={{ width: "100px", height: "100px", borderRadius: "50%", border: `4px solid black`, backgroundColor: "white" }}>
                <Typography align="center" variant='body1'>Root</Typography>
                <Divider>0</Divider>
            </Box>
            <Handle type="source" position={Position.Bottom} id="out" />
        </Box>
    );
}

const nodeTypes = {
    abNode: AbNode,
    abRoot: AbRoot,
};

function Test({ onResChange }) {
    const theme = useTheme();
    const store = useStoreApi();
    const reactFlowWrapper = useRef<any>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | any>(null);

    const handleConnect = useCallback((link, edges: any) => {
        if (!reactFlowInstance) return;
        let modified = {};
        let source = reactFlowInstance.getNode(link.source);
        modified[link.target] = reactFlowInstance.getNode(link.target);
        modified[link.target].data.totalCost = (source?.data?.totalCost ?? 0) + modified[link.target].data.cost;
        let currentId = [link.target];
        while (currentId.length) {
            let newIds: any[] = []
            currentId.forEach((cId) => {
                let es: any[] = edges.filter((e) => e.source === cId);
                es.forEach((edg) => {
                    modified[edg.target] = reactFlowInstance.getNode(edg.target);
                    modified[edg.target].data.totalCost = modified[cId].data.totalCost + modified[edg.target].data.cost;
                    newIds.push(edg.target);
                })
            })
            currentId = newIds;
        }
        setNodes((nodeList) => nodeList.map((n: any) => {
            if (n.id in modified) {
                n.data = { ...modified[n.id].data };
                console.log(n)
            }
            return n;
        }));
        //setNodes(newNodes);
    }, [reactFlowInstance, setNodes]);

    const onConnect = useCallback((params) => {
        setEdges((eds) => {
            let newEdges = addEdge(params, eds);
            //handleConnect(params, newEdges);
            return newEdges
        })
    }, [setEdges, handleConnect]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const updateNodes = useCallback((newnodes) => setNodes((nodes) => {
        return nodes.map((n) => {
            return newnodes[n.id] ?? n;
        })
    }), [nodes, setNodes])
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const data = event.dataTransfer.getData('application/reactflow');
            if (!data) return
            let pData = JSON.parse(data);
            let { name, nodeType, type, cost } = pData;

            // check if the dropped element is valid
            if (typeof nodeType === 'undefined' || !nodeType) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            if (!onResChange(type, cost)) return;
            const newNode = {
                id: getId(),
                type: nodeType,
                position,
                data: {
                    label: `${name} node`, ...pData,
                    totalCost: pData.cost,
                    updateNodes
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes, onResChange, updateNodes]
    );




    const getClosestEdge = useCallback((node) => {
        const { nodeInternals } = store.getState();
        const storeNodes = Array.from(nodeInternals.values());

        const closestNode: any = storeNodes.reduce(
            (res, n: any) => {
                if (n.id !== node.id) {
                    const dx = n.positionAbsolute.x - node.positionAbsolute.x;
                    const dy = n.positionAbsolute.y - node.positionAbsolute.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < res.distance && d < MIN_DISTANCE) {
                        res.distance = d;
                        res.node = n;
                    }
                }

                return res;
            },
            {
                distance: Number.MAX_VALUE,
                node: null,
            }
        );

        if (!closestNode.node) {
            return null;
        }

        const closeNodeIsSource = closestNode.node.positionAbsolute.x < node.positionAbsolute.x;

        return {
            id: `${node.id}-${closestNode.node.id}`,
            source: closeNodeIsSource ? closestNode.node.id : node.id,
            target: closeNodeIsSource ? node.id : closestNode.node.id,
        };
    }, []);

    const onNodeDrag = useCallback(
        (_, node) => {
            const closeEdge: any = getClosestEdge(node);

            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                if (
                    closeEdge &&
                    !nextEdges.find((ne) => ne.source === closeEdge.source && ne.target === closeEdge.target)
                ) {
                    closeEdge.className = 'temp';
                    nextEdges.push(closeEdge);
                }

                return nextEdges;
            });
        },
        [getClosestEdge, setEdges]
    );

    const onNodeDragStop = useCallback(
        (_, node) => {
            const closeEdge = getClosestEdge(node);

            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                if (closeEdge) {
                    nextEdges.push(closeEdge);
                    //handleConnect(closeEdge, nextEdges)
                }

                return nextEdges;
            });
        },
        [getClosestEdge, handleConnect]
    );

    const onNodesDelete = useCallback((nodes) => {
        nodes.forEach(n => {
            onResChange(n.data.type, -n.data.cost);
        });
    }, [onResChange])

    return (<>
        <Box ref={reactFlowWrapper} style={{ width: '100%', height: '100vh' }}>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodesDelete={onNodesDelete}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>

        </Box>

    </>)

}


function AbDrawer({ abs, res }) {
    const [open, setOpen] = useState(true);
    const [subListOpen, setSubListOpen] = useState<boolean[]>([])



    const handleDrawerOpen = () => {
        setOpen((old) => !old);
    };

    function filterAbs() {
        let list = {};

        abs.forEach((item) => {
            list[item.type] ? list[item.type].push(item) : list[item.type] = [item];
        })
        return list;
    }

    let absList = filterAbs();

    const onDragStart = (event, data) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(data));
        event.dataTransfer.effectAllowed = 'move';
    };

    function handleClickSubList(id) {
        setSubListOpen((old) => {
            let newList: boolean[] = [...old];
            newList[id] = !newList[id];
            return newList;
        });
    }

    return (<>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerOpen}>
                    {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            {Object.keys(absList).map((subList, slId) =>
                <React.Fragment key={subList}>
                    <ListItemButton sx={{ maxHeight: "100px" }} onClick={() => handleClickSubList(slId)}>
                        <ListItemAvatar sx={{ mr: 2 }}>
                            <Box alignItems="center"
                                justifyContent="center"
                                display="flex">
                                {/* sx={{ width: "35px", height: "35px", borderRadius: "50%", border: "4px solid " + slColors[slId] }}>*/}
                                <CircularProgress size={60} variant="determinate" value={((res[subList].max - res[subList].current) / res[subList].max * 100)} sx={{ color: slColors[subList] }} />
                                <Box display={"flex"} alignItems={"flex-start"} position="absolute">
                                    <Typography sx={{ fontSize: '1.8rem' }} variant='body1'>{res[subList].current}</Typography>
                                    <Typography alignSelf='center' sx={{ml: 0.5, fontSize: '0.8rem' }} variant='body2' >/{res[subList].max}</Typography>

                                </Box>
                                {/* <ListItemText primary={"50"} primaryTypographyProps={{ align: "center" }} /></CircularProgress> */}
                            </Box>
                        </ListItemAvatar>
                        <ListItemText primary={`Node ${subList}`} />
                        {subListOpen[slId] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse sx={overflowNoScrollbar} in={subListOpen[slId]} timeout="auto" unmountOnExit>

                        <List>
                            {absList[subList].map(({ name, type, color, about, ...rest }: any, index) => (
                                <ListItem key={name} disablePadding sx={{ display: 'block' }}>
                                    <Box onDragStart={(event) => onDragStart(event, { ...rest, color, name, slId, type, nodeType: "abNode" })}
                                        draggable
                                        sx={{ backgroundColor: `color-mix(in srgb, ${slColors[slId]} 70%, ${color})` }}>

                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </React.Fragment>
            )}
        </Drawer>

    </>)
}

const defaultRes = [
    { current: 0, max: 50 },
    { current: 0, max: 50 },
    { current: 0, max: 50 },
    { current: 0, max: 50 },
    { current: 0, max: 50 },
];

export default () => {
    const [res, setRes] = useState(defaultRes);

    const onResChange = useCallback((id, value) => {
        let result = res[id].current + value;
        if (result >= 0 && result <= res[id].max) {
            setRes((old) => {
                old[id].current = result;
                return [...old];
            })
            return true;
        }
        return false;
    }, [res, setRes]);

    return (
        <Box style={{ width: '100vw', height: '100vh' }}>
            <ReactFlowProvider>
                <AbDrawer abs={defaultItems.inactiveAb} res={res} />
                <Test onResChange={onResChange} />
            </ReactFlowProvider>
        </Box>
    );
}