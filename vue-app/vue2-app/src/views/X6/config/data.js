// 测试数据
const rawSource = {
    cells: [
        {
            shape: 'edge',
            attrs: {
                stroke: {
                    fill: 'none',
                    connection: true,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    stroke: '#666'
                }
            },
            id: '4ac9f1b6-0c0a-44ff-9a11-26fd7f1997f8',
            markup: [{ tagName: 'path', selector: 'stroke' }],
            connector: { name: 'rounded' },
            zIndex: 0,
            source: { cell: 'ff271f7e-06fa-4af1-a080-94b665b607fc', port: 'bbd856f0-1cd8-44b8-82b3-947ae8340c75' },
            target: { cell: '43323a15-147c-481b-b3fd-87ceb05b832f', port: '22fb5965-2fdf-4b5d-9517-c8881d8ff91d' },
            tools: { items: [], name: null }
        },
        {
            shape: 'edge',
            attrs: {
                stroke: {
                    fill: 'none',
                    connection: true,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    stroke: '#666'
                }
            },
            id: 'fcf08a94-2a93-497a-87d8-cc9a5658c32a',
            markup: [{ tagName: 'path', selector: 'stroke' }],
            connector: { name: 'rounded' },
            zIndex: 0,
            source: { cell: '14d9972f-1635-4ccd-b563-8b2944150ffb', port: 'ea9df147-d63c-451f-9536-419bc3812cbd' },
            target: { cell: '43323a15-147c-481b-b3fd-87ceb05b832f', port: '9608a842-cf96-4c24-98ec-817c90345453' },
            tools: { items: [], name: null }
        },
        {
            shape: 'edge',
            attrs: {
                stroke: {
                    fill: 'none',
                    connection: true,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    stroke: '#666'
                }
            },
            id: '57e15ccf-0f81-4951-a9e0-1f5c26e0430c',
            markup: [{ tagName: 'path', selector: 'stroke' }],
            connector: { name: 'rounded' },
            zIndex: 0,
            source: { cell: '22e19155-d668-4c99-943a-5b464bc47847', port: 'a4665d7c-0f7e-47cf-8880-cd77eff37ef6' },
            target: { cell: '43323a15-147c-481b-b3fd-87ceb05b832f', port: '30c5e83f-f5d0-42f7-ac55-91af5d4a952c' }
        },
        {
            shape: 'edge',
            attrs: {
                stroke: {
                    fill: 'none',
                    connection: true,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    stroke: '#666'
                }
            },
            id: '0f93a7d2-5b70-42e1-95ce-66ddde154bb9',
            markup: [{ tagName: 'path', selector: 'stroke' }],
            connector: { name: 'rounded' },
            zIndex: 0,
            source: { cell: 'bb4bf579-6049-4122-af21-13df49448b24', port: '69f387e6-0445-46f0-b8c3-ead0e80146b3' },
            target: { cell: '43323a15-147c-481b-b3fd-87ceb05b832f', port: '9608a842-cf96-4c24-98ec-817c90345453' }
        },
        {
            shape: 'edge',
            attrs: {
                stroke: {
                    fill: 'none',
                    connection: true,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    stroke: '#666'
                }
            },
            id: 'd92d2a37-b2b8-4bfa-8933-ccf7172ce2e1',
            markup: [{ tagName: 'path', selector: 'stroke' }],
            connector: { name: 'rounded' },
            zIndex: 0,
            source: { cell: 'db0d10ed-f02c-458f-a22d-a22e0ef1bde5', port: 'fe3982ca-3e17-44d2-bd91-16f12e940843' },
            target: { cell: 'b70f7163-a56a-45c1-871f-af805cd96f7c', port: '2ba63a04-82ee-448f-9d76-d91a9a364a1f' },
            tools: { items: [], name: null }
        },
        {
            shape: 'edge',
            attrs: {
                stroke: {
                    fill: 'none',
                    connection: true,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    stroke: '#666'
                }
            },
            id: 'a302b000-0d50-4e5c-8e1e-7e5e6ec62335',
            markup: [{ tagName: 'path', selector: 'stroke' }],
            connector: { name: 'rounded' },
            zIndex: 0,
            source: { cell: 'e4d9722b-1b16-4c1e-aadb-1bd59a4384f9', port: '40cc081d-0293-4265-adb2-ce2d6bfd9b59' },
            target: { cell: '43323a15-147c-481b-b3fd-87ceb05b832f', port: '9df95755-29c6-4998-980c-0e97b1a965a7' }
        },
        {
            shape: 'edge',
            attrs: {
                stroke: {
                    fill: 'none',
                    connection: true,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    stroke: '#666'
                }
            },
            id: 'ee8f737b-4ba7-40ad-84b5-2c563ead5ac9',
            markup: [{ tagName: 'path', selector: 'stroke' }],
            connector: { name: 'rounded' },
            zIndex: 0,
            source: { cell: 'e4d9722b-1b16-4c1e-aadb-1bd59a4384f9', port: '1f063ba0-796f-4a9e-b56c-7d25b13e8a3f' },
            target: { cell: 'b70f7163-a56a-45c1-871f-af805cd96f7c', port: '074a990f-fc33-486e-a5e6-6e3209aa4669' },
            tools: { items: [], name: null }
        },
        {
            shape: 'edge',
            attrs: {
                stroke: {
                    fill: 'none',
                    connection: true,
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                    stroke: '#666'
                }
            },
            id: 'ef18ff1f-abee-418f-b1a2-0400bdad64cb',
            markup: [{ tagName: 'path', selector: 'stroke' }],
            connector: { name: 'rounded' },
            zIndex: 0,
            source: { cell: 'e4d9722b-1b16-4c1e-aadb-1bd59a4384f9', port: '7adaf768-d67c-4b34-a6d5-ea8e509dfab5' },
            target: { cell: 'db0d10ed-f02c-458f-a22d-a22e0ef1bde5', port: 'c8210845-4e4a-47d5-8f8f-483027e71c44' },
            tools: { items: [], name: null }
        },
        {
            position: { x: -280, y: -296 },
            size: { width: 64, height: 64 },
            attrs: { text: { text: '矩形' } },
            visible: true,
            shape: 'rect',
            id: 'db0d10ed-f02c-458f-a22d-a22e0ef1bde5',
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    absolute: {
                        position: 'absolute',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#008CFF', strokeWidth: 2, fill: '#fff' } }
                    }
                },
                items: [
                    { group: 'top', id: 'c8210845-4e4a-47d5-8f8f-483027e71c44' },
                    {
                        group: 'right',
                        id: 'fe3982ca-3e17-44d2-bd91-16f12e940843'
                    },
                    { group: 'bottom', id: 'f86a7d8d-a508-4c0b-bb8a-984037704d41' },
                    {
                        group: 'left',
                        id: 'ddd383d3-a4ea-4c12-98f5-8de6cc2afd9f'
                    }
                ]
            },
            zIndex: 1
        },
        {
            position: { x: 100, y: -296 },
            size: { width: 64, height: 64 },
            attrs: { text: { text: '矩形' } },
            visible: true,
            shape: 'rect',
            id: 'b70f7163-a56a-45c1-871f-af805cd96f7c',
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    absolute: {
                        position: 'absolute',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#008CFF', strokeWidth: 2, fill: '#fff' } }
                    }
                },
                items: [
                    { group: 'top', id: '074a990f-fc33-486e-a5e6-6e3209aa4669' },
                    {
                        group: 'right',
                        id: '0e69a4ac-4adc-4a14-b32a-904da21d0231'
                    },
                    { group: 'bottom', id: '8c9d30e9-253e-4add-a2ed-3a609aa32001' },
                    {
                        group: 'left',
                        id: '2ba63a04-82ee-448f-9d76-d91a9a364a1f'
                    }
                ]
            },
            zIndex: 3
        },
        {
            position: { x: -240, y: -180 },
            size: { width: 64, height: 64 },
            attrs: {
                text: { text: 'Http' },
                settingImage: { 'xlink:href': 'x6/icon-flow-http.svg' },
                settingName: { text: 'Http' }
            },
            visible: true,
            shape: 'setting-shape',
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    absolute: {
                        position: 'absolute',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#008CFF', strokeWidth: 2, fill: '#fff' } }
                    }
                },
                items: [
                    { group: 'top', id: 'eea483cc-bd28-4df3-9d38-ee59c3fc8d25' },
                    {
                        group: 'right',
                        id: 'bbd856f0-1cd8-44b8-82b3-947ae8340c75'
                    },
                    { group: 'bottom', id: '654d4e45-a7d7-440e-8a30-841599449639' },
                    {
                        group: 'left',
                        id: 'd488d550-9088-42ec-bd46-00b4272cdd53'
                    }
                ]
            },
            id: 'ff271f7e-06fa-4af1-a080-94b665b607fc',
            data: { shape: 'setting-shape', id: 'Http' },
            zIndex: 4
        },
        {
            position: { x: -240, y: -37 },
            size: { width: 64, height: 64 },
            attrs: {
                text: { text: 'Client' },
                settingImage: { 'xlink:href': 'x6/icon-flow-client.svg' },
                settingName: { text: 'Client' }
            },
            visible: true,
            shape: 'setting-shape',
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    absolute: {
                        position: 'absolute',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#008CFF', strokeWidth: 2, fill: '#fff' } }
                    }
                },
                items: [
                    { group: 'top', id: 'e82507d4-1877-45af-9a69-8259d122153a' },
                    {
                        group: 'right',
                        id: 'ea9df147-d63c-451f-9536-419bc3812cbd'
                    },
                    { group: 'bottom', id: '1a88dfd9-a164-47f8-a727-bdd1acc6a513' },
                    {
                        group: 'left',
                        id: '66e0cad6-b0ea-4d04-b16d-c15e873db425'
                    }
                ]
            },
            id: '14d9972f-1635-4ccd-b563-8b2944150ffb',
            data: { shape: 'setting-shape', id: 'Client' },
            zIndex: 5
        },
        {
            position: { x: -89, y: -180 },
            size: { width: 64, height: 64 },
            attrs: {
                text: { text: 'Cloud' },
                settingImage: { 'xlink:href': 'x6/icon-flow-cloud.svg' },
                settingName: { text: 'Cloud' }
            },
            visible: true,
            shape: 'setting-shape',
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    absolute: {
                        position: 'absolute',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#008CFF', strokeWidth: 2, fill: '#fff' } }
                    }
                },
                items: [
                    { group: 'top', id: '9df95755-29c6-4998-980c-0e97b1a965a7' },
                    {
                        group: 'right',
                        id: '30c5e83f-f5d0-42f7-ac55-91af5d4a952c'
                    },
                    { group: 'bottom', id: '9608a842-cf96-4c24-98ec-817c90345453' },
                    {
                        group: 'left',
                        id: '22fb5965-2fdf-4b5d-9517-c8881d8ff91d'
                    }
                ]
            },
            id: '43323a15-147c-481b-b3fd-87ceb05b832f',
            data: { shape: 'setting-shape', id: 'Cloud' },
            zIndex: 6
        },
        {
            position: { x: 59, y: -180 },
            size: { width: 64, height: 64 },
            attrs: {
                text: { text: 'Sql' },
                settingImage: { 'xlink:href': 'x6/icon-flow-sql.svg' },
                settingName: { text: 'Sql' }
            },
            visible: true,
            shape: 'setting-shape',
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    absolute: {
                        position: 'absolute',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#008CFF', strokeWidth: 2, fill: '#fff' } }
                    }
                },
                items: [
                    { group: 'top', id: '90883eb7-0785-4aeb-8249-41455d579d8b' },
                    {
                        group: 'right',
                        id: 'c1e1cf83-73c7-4ab9-a795-d82e8b252265'
                    },
                    { group: 'bottom', id: 'c92a0698-cf03-47d9-b394-6797600de749' },
                    {
                        group: 'left',
                        id: 'a4665d7c-0f7e-47cf-8880-cd77eff37ef6'
                    }
                ]
            },
            id: '22e19155-d668-4c99-943a-5b464bc47847',
            data: { shape: 'setting-shape', id: 'Sql' },
            zIndex: 7
        },
        {
            position: { x: 59, y: -37 },
            size: { width: 64, height: 64 },
            attrs: {
                text: { text: 'Http' },
                settingImage: { 'xlink:href': 'x6/icon-flow-http.svg' },
                settingName: { text: 'Http' }
            },
            visible: true,
            shape: 'setting-shape',
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    absolute: {
                        position: 'absolute',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#008CFF', strokeWidth: 2, fill: '#fff' } }
                    }
                },
                items: [
                    { group: 'top', id: '88d575ae-b40b-4fce-a575-b855878ea955' },
                    {
                        group: 'right',
                        id: '878c522d-40c8-4c9d-bd63-75b0b6a9003a'
                    },
                    { group: 'bottom', id: 'ac25d33a-dbd7-4614-b196-dad532d41734' },
                    {
                        group: 'left',
                        id: '69f387e6-0445-46f0-b8c3-ead0e80146b3'
                    }
                ]
            },
            id: 'bb4bf579-6049-4122-af21-13df49448b24',
            data: { shape: 'setting-shape', id: 'Http' },
            zIndex: 8
        },
        {
            position: { x: -89, y: -402 },
            size: { width: 64, height: 64 },
            attrs: {
                text: { text: 'Cloud' },
                settingImage: { 'xlink:href': 'x6/icon-flow-cloud.svg' },
                settingName: { text: 'Cloud' }
            },
            visible: true,
            shape: 'setting-shape',
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                width: 12,
                                r: 6,
                                magnet: true,
                                stroke: '#008CFF',
                                strokeWidth: 2,
                                fill: '#fff',
                                zIndex: 1
                            }
                        }
                    },
                    absolute: {
                        position: 'absolute',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#008CFF', strokeWidth: 2, fill: '#fff' } }
                    }
                },
                items: [
                    { group: 'top', id: '276ca768-b3ff-4869-bf46-e94d3db5dad4' },
                    {
                        group: 'right',
                        id: '1f063ba0-796f-4a9e-b56c-7d25b13e8a3f'
                    },
                    { group: 'bottom', id: '40cc081d-0293-4265-adb2-ce2d6bfd9b59' },
                    {
                        group: 'left',
                        id: '7adaf768-d67c-4b34-a6d5-ea8e509dfab5'
                    }
                ]
            },
            id: 'e4d9722b-1b16-4c1e-aadb-1bd59a4384f9',
            data: { shape: 'setting-shape', id: 'Cloud' },
            zIndex: 9
        }
    ]
}
export default rawSource
