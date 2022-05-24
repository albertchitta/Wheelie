using Wheelie.Models;
using Microsoft.Data.SqlClient;

namespace Wheelie.Repositories
{
    public class BikerRepository : IBikerRepository
    {
        private readonly IConfiguration _config;

        public BikerRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection
                    (_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Biker> GetAllBikers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               FirebaseUserId,
                                               [Role],
                                               [Name],
                                               Email,
                                               UserName,
                                               [Level],
                                               [Location],
                                               ImageUrl,
                                               Rides,
                                               Distance
                                        FROM Biker";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Biker> bikers = new List<Biker>();
                    while (reader.Read())
                    {
                        Biker biker = new Biker
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            Role = reader.GetString(reader.GetOrdinal("Role")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            Level = reader.GetString(reader.GetOrdinal("Level")),
                            Location = reader.GetString(reader.GetOrdinal("Location")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Rides = reader.GetInt32(reader.GetOrdinal("Rides")),
                            Distance = (double)reader.GetDecimal(reader.GetOrdinal("Distance"))
                        };

                        bikers.Add(biker);
                    }

                    reader.Close();

                    Console.WriteLine(bikers);
                    return bikers;
                }
            }
        }

        public Biker GetByFirebaseUserId(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               FirebaseUserId,
                                               [Role],
                                               [Name],
                                               Email,
                                               UserName,
                                               [Level],
                                               [Location],
                                               ImageUrl,
                                               Rides,
                                               Distance
                                        FROM Biker
                                        WHERE FirebaseUserId = @firebaseUserId";

                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUserId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Biker biker = new Biker
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            Role = reader.GetString(reader.GetOrdinal("Role")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            Level = reader.GetString(reader.GetOrdinal("Level")),
                            Location = reader.GetString(reader.GetOrdinal("Location")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Rides = reader.GetInt32(reader.GetOrdinal("Rides")),
                            Distance = (double)reader.GetDecimal(reader.GetOrdinal("Distance"))
                        };

                        reader.Close();
                        return biker;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddBiker(Biker biker)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Biker (FirebaseUserId,
                                                           [Role],
                                                           [Name],
                                                           Email,
                                                           UserName,
                                                           [Level],
                                                           [Location],
                                                           ImageUrl,
                                                           Rides,
                                                           Distance)
                                        OUTPUT INSERTED.ID
                                        VALUES (@firebaseUserId, @role, @name, @email, @userName, @level, @location, @imageUrl, @rides, @distance);";

                    cmd.Parameters.AddWithValue("@firebaseUserId", biker.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@role", biker.Role);
                    cmd.Parameters.AddWithValue("@name", biker.Name);
                    cmd.Parameters.AddWithValue("@email", biker.Email);
                    cmd.Parameters.AddWithValue("@userName", biker.UserName);
                    cmd.Parameters.AddWithValue("@level", biker.Level);
                    cmd.Parameters.AddWithValue("@location", biker.Location);
                    cmd.Parameters.AddWithValue("@imageUrl", biker.ImageUrl);
                    cmd.Parameters.AddWithValue("@rides", biker.Rides);
                    cmd.Parameters.AddWithValue("@distance", biker.Distance);

                    int id = (int)cmd.ExecuteScalar();

                    biker.Id = id;
                }
            }
        }

        public void UpdateBiker(Biker biker)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Biker
                                        SET [Role] = @role,
                                            [Name] = @name,
                                            Email = @email,
                                            UserName = @userName,
                                            [Level] = @level,
                                            [Location] = @location,
                                            ImageUrl = @imageUrl,
                                            Rides = @rides,
                                            Distance = @distance
                                        WHERE FirebaseUserId = @firebaseUserId";

                    cmd.Parameters.AddWithValue("@firebaseUserId", biker.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@role", biker.Role);
                    cmd.Parameters.AddWithValue("@name", biker.Name);
                    cmd.Parameters.AddWithValue("@email", biker.Email);
                    cmd.Parameters.AddWithValue("@userName", biker.UserName);
                    cmd.Parameters.AddWithValue("@level", biker.Level);
                    cmd.Parameters.AddWithValue("@location", biker.Location);
                    cmd.Parameters.AddWithValue("@imageUrl", biker.ImageUrl);
                    cmd.Parameters.AddWithValue("@rides", biker.Rides);
                    cmd.Parameters.AddWithValue("@distance", biker.Distance);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteBiker(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Biker
                                        WHERE FirebaseUserId = @firebaseUserId";

                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
