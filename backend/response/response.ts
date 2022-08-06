const response = (req: any, res: any, next: any) => {
    res.success = (message: string, data: any) => {
        return res.status(200).send({success: true, message: message, data: data});
    };

    res.error = (message:string) =>{
        return res.status(422).send({success: true, message: message});
    };
    next();
    
};
export default response;