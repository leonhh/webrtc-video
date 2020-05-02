module.exports = {
    "env": {
        "browser": true
    },
    "extends": [
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/tslint",
        "@typescript-eslint/eslint-plugin",
        "react"
    ],
    "settings": {
        "react": {
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
        },
    },
    "rules": {
        "prettier/prettier": "warn",
        "@typescript-eslint/array-type": "warn",
        "@typescript-eslint/class-name-casing": "warn",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        // "@typescript-eslint/quotes": [
        //     "error",
        //     "single"
        // ],
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "arrow-parens": [
            "error",
            "as-needed"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "warn",
        "no-eval": "error",
        "no-multiple-empty-lines": "warn",
        "no-new-wrappers": "warn",
        "prefer-const": "warn",
        "radix": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        '@typescript-eslint/explicit-function-return-type': 'off',
        "@typescript-eslint/interface-name-prefix": "warn",
        "@typescript-eslint/camelcase": "warn",
        "@typescript-eslint/array-type": ['warn', {
            "default": "generic",
            "readonly": "generic"
        }],
        "react/prop-types": "off",
        "@typescript-eslint/tslint/config": [
            "warn",
            {
                "rules": {
                    "no-boolean-literal-compare": true,
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-separator",
                        "check-preblock"
                    ]
                }
            }
        ]
    }
};
