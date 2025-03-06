const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const webpack  = require('webpack');
const TerserPlugin=require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports={
    entry:'./src/js/main.js',
    output:{
        filename:'[name].[contenthash].js',
        path:path.resolve(__dirname,'dist'),
        chunkFilename:'[name].[chunkhash].js'
    },
    optimization:{
        splitChunks:{
            chunks:'all',
            minSize:20000,
            maxSize:40000,
            minChunks:1,
            automaticNameDelimiter:'-',
            cacheGroups:{
                vendor:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'vendor',
                    chunks:'all'
                },
                common:{
                    test:/[\\/]components[\\/]/,
                    name:'common',
                    chunks:'all'
                }
            }
        },
        minimize:true,
        minimizer:[
            new TerserPlugin({
            terserOptions:{
                compress:{
                    drop_console:true,
                }
            }
            }),
            new CssMinimizerPlugin({
                test:/\.css$/i,
                minimizerOptions:{
                    preset:[
                        "default",
                        {
                            discardComments:{removeAll:true},
                        }
                    ]
                }
            })
        ],
        usedExports:true
    },
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader' 
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.(png|jpe?g|gif|svg)/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192 // 8KB altındakileri inline yapar, büyükleri dosya olarak bırakır
                    }
                },
                generator: {
                    filename: 'assets/images/[name].[contenthash][ext]'
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader',
                    options:{
                        minimize:true
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:false
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename:'[name].[contenthash].css'}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production')
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/data', to: 'data' }
            ]
        })
    ],
    mode:'production',
};