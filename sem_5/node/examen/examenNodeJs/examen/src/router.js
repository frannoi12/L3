
export default (app) => {
    app.use('/test', (_, res) =>{
        res.send('test');
    });
}