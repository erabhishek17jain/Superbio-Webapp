export const getSheetsByOrgId = {
    sheets: [
        {
            id: '66ddfeffc9537a7b96d424fc',
            sheetId: '1ULoAtJ3RxeVssUoQ-tP2FoN4SeBOcJkoocKpnHz1TfU',
            sheetName: 'Till 31st August',
            title: 'profile Data Sheet',
            columns: ['Links', 'Creator Name', 'Creator email', 'Campaign phase', 'Category', 'Subcategory'],
            importStatus: 'MAPPED',
            orgId: '666f306c1beece409cdcb970',
            domain: 'profile',
            columnMappings: {
                A: 'profile_link',
                B: 'average_post_cost',
                D: 'category',
                F: 'tags',
            },
        },
        {
            id: '66f86823ee70c3015086b973',
            sheetId: '1WmivHqL6WaIq-YhuIA8ptOjw73-P3Nu8X_GF8oO4sRs',
            sheetName: 'Twitter Influncers',
            title: 'twitter profiles',
            columns: ['Links', 'Creator Name', 'Creator email', 'Campaign phase', 'Category', 'Subcategory'],
            importStatus: 'Sheet_Info_Saved',
            orgId: '666f306c1beece409cdcb970',
            domain: 'profile',
            columnMappings: null,
        },
    ],
};

export const getCampaignsByOrgId = {
    data: [
        {
            _id: {
                $oid: '66ff8e111dc3d43d7c0b1f55',
            },
            title: 'Demo & Testing',
            description: 'tTest',
            startDate: '2024-10-04T06:41:06.756Z',
            status: 'active',
            brand: 'Test',
            keywords: ['test'],
            priority: 1,
            endDate: '2024-10-09T06:41:06.756Z',
            createdAt: {
                $date: {
                    $numberLong: '1728024081236',
                },
            },
            updatedAt: {
                $date: {
                    $numberLong: '1728024081236',
                },
            },
            groups: 337,
            source: 'sheet',
            user: {
                _id: {
                    $oid: '66be68ab7e85f77ab1ac1be5',
                },
                name: 'Abhishek Jain',
                email: 'abhishek.jain@loqo.ai',
                role: 'admin',
                profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKtXKCqPugSgghei8s-DPCAzygdRAKeDdV6dLHzDoRo0XCchA=s96-c',
            },
            sharedUsers: [],
        },
        {
            _id: {
                $oid: '66fd708699b65de73be0f101',
            },
            title: 'Demo Post',
            description: 'This is demo post campaign',
            startDate: '2024-10-02T16:10:01.643Z',
            status: 'active',
            brand: 'LOQO AI',
            keywords: ['insta', 'twitter'],
            priority: 1,
            endDate: '2024-10-07T16:10:01.643Z',
            createdAt: {
                $date: {
                    $numberLong: '1727885446355',
                },
            },
            updatedAt: {
                $date: {
                    $numberLong: '1727885519155',
                },
            },
            groups: 216,
            source: 'sheet',
            user: {
                _id: {
                    $oid: '66be68ab7e85f77ab1ac1be5',
                },
                name: 'Abhishek Jain',
                email: 'abhishek.jain@loqo.ai',
                role: 'admin',
                profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKtXKCqPugSgghei8s-DPCAzygdRAKeDdV6dLHzDoRo0XCchA=s96-c',
            },
            sharedUsers: [],
        },
        {
            _id: {
                $oid: '66f5817b989cac906270c983',
            },
            title: 'Multisheet posts',
            description: 'test',
            startDate: '2024-09-26T15:44:43.038Z',
            status: 'active',
            brand: 'test',
            keywords: ['test'],
            priority: 1,
            endDate: '2024-10-01T15:44:43.038Z',
            createdAt: {
                $date: {
                    $numberLong: '1727365499464',
                },
            },
            updatedAt: {
                $date: {
                    $numberLong: '1728019656388',
                },
            },
            groups: 5,
            source: 'sheet',
            user: {
                _id: {
                    $oid: '66be68ab7e85f77ab1ac1be5',
                },
                name: 'Abhishek Jain',
                email: 'abhishek.jain@loqo.ai',
                role: 'admin',
                profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKtXKCqPugSgghei8s-DPCAzygdRAKeDdV6dLHzDoRo0XCchA=s96-c',
            },
            sharedUsers: [],
        },
        {
            _id: {
                $oid: '66f57e9e989cac906270c97c',
            },
            title: 'Test multisheet',
            description: 'test',
            startDate: '2024-09-26T15:32:30.199Z',
            status: 'active',
            brand: 'test',
            keywords: ['test'],
            priority: 1,
            endDate: '2024-10-01T15:32:30.199Z',
            createdAt: {
                $date: {
                    $numberLong: '1727364766805',
                },
            },
            updatedAt: {
                $date: {
                    $numberLong: '1727364766805',
                },
            },
            groups: 2,
            source: 'sheet',
            user: {
                _id: {
                    $oid: '66be68ab7e85f77ab1ac1be5',
                },
                name: 'Abhishek Jain',
                email: 'abhishek.jain@loqo.ai',
                role: 'admin',
                profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKtXKCqPugSgghei8s-DPCAzygdRAKeDdV6dLHzDoRo0XCchA=s96-c',
            },
            sharedUsers: [],
        },
        {
            _id: {
                $oid: '66ff8e111dc3d43d7c0b1f55',
            },
            title: 'Demo & Testing',
            description: 'tTest',
            startDate: '2024-10-04T06:41:06.756Z',
            status: 'active',
            brand: 'Test',
            keywords: ['test'],
            priority: 1,
            endDate: '2024-10-09T06:41:06.756Z',
            createdAt: {
                $date: {
                    $numberLong: '1728024081236',
                },
            },
            updatedAt: {
                $date: {
                    $numberLong: '1728024081236',
                },
            },
            groups: 337,
            source: 'sheet',
            user: {
                _id: {
                    $oid: '66be68ab7e85f77ab1ac1be5',
                },
                name: 'Abhishek Jain',
                email: 'abhishek.jain@loqo.ai',
                role: 'admin',
                profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKtXKCqPugSgghei8s-DPCAzygdRAKeDdV6dLHzDoRo0XCchA=s96-c',
            },
            sharedUsers: [],
        },
        {
            _id: {
                $oid: '66fd708699b65de73be0f101',
            },
            title: 'Demo Post',
            description: 'This is demo post campaign',
            startDate: '2024-10-02T16:10:01.643Z',
            status: 'active',
            brand: 'LOQO AI',
            keywords: ['insta', 'twitter'],
            priority: 1,
            endDate: '2024-10-07T16:10:01.643Z',
            createdAt: {
                $date: {
                    $numberLong: '1727885446355',
                },
            },
            updatedAt: {
                $date: {
                    $numberLong: '1727885519155',
                },
            },
            groups: 216,
            source: 'sheet',
            user: {
                _id: {
                    $oid: '66be68ab7e85f77ab1ac1be5',
                },
                name: 'Abhishek Jain',
                email: 'abhishek.jain@loqo.ai',
                role: 'admin',
                profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKtXKCqPugSgghei8s-DPCAzygdRAKeDdV6dLHzDoRo0XCchA=s96-c',
            },
            sharedUsers: [],
        },
        {
            _id: {
                $oid: '66f5817b989cac906270c983',
            },
            title: 'Multisheet posts',
            description: 'test',
            startDate: '2024-09-26T15:44:43.038Z',
            status: 'active',
            brand: 'test',
            keywords: ['test'],
            priority: 1,
            endDate: '2024-10-01T15:44:43.038Z',
            createdAt: {
                $date: {
                    $numberLong: '1727365499464',
                },
            },
            updatedAt: {
                $date: {
                    $numberLong: '1728019656388',
                },
            },
            groups: 5,
            source: 'sheet',
            user: {
                _id: {
                    $oid: '66be68ab7e85f77ab1ac1be5',
                },
                name: 'Abhishek Jain',
                email: 'abhishek.jain@loqo.ai',
                role: 'admin',
                profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKtXKCqPugSgghei8s-DPCAzygdRAKeDdV6dLHzDoRo0XCchA=s96-c',
            },
            sharedUsers: [],
        },
        {
            _id: {
                $oid: '66f57e9e989cac906270c97c',
            },
            title: 'Test multisheet',
            description: 'test',
            startDate: '2024-09-26T15:32:30.199Z',
            status: 'active',
            brand: 'test',
            keywords: ['test'],
            priority: 1,
            endDate: '2024-10-01T15:32:30.199Z',
            createdAt: {
                $date: {
                    $numberLong: '1727364766805',
                },
            },
            updatedAt: {
                $date: {
                    $numberLong: '1727364766805',
                },
            },
            groups: 2,
            source: 'sheet',
            user: {
                _id: {
                    $oid: '66be68ab7e85f77ab1ac1be5',
                },
                name: 'Abhishek Jain',
                email: 'abhishek.jain@loqo.ai',
                role: 'admin',
                profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKtXKCqPugSgghei8s-DPCAzygdRAKeDdV6dLHzDoRo0XCchA=s96-c',
            },
            sharedUsers: [],
        },
    ],
};