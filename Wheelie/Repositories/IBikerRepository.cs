using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IBikerRepository
    {
        List<Biker> GetAllBikers();
        //void AddBiker(Biker biker);
        //void UpdateBiker(Biker biker);
        //void DeleteBiker(Biker biker);
        //Biker GetByFirebaseUserId(string firebaseUserId);
    }
}
