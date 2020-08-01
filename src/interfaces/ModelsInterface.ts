import { UserModel } from "../models/UserModel";
import { ProfileModel } from "../models/ProfileModel";
import { TemplateModel } from "../models/*TemplateModel";
import { InterestModel } from "../models/InterestModel";

export interface ModelsInterface{
    User: UserModel;
    Profile: ProfileModel;
    Template: TemplateModel;
    Interest: InterestModel;
}